import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    with zipfile.ZipFile(pptx_path, 'r') as z:
        # We want to find relationship maps for each slide
        slide_rels = [f for f in z.namelist() if f.startswith('ppt/slides/_rels/slide') and f.endswith('.xml.rels')]
        
        def slide_num_from_rel(filename):
            try:
                return int(filename.replace('ppt/slides/_rels/slide', '').replace('.xml.rels', ''))
            except:
                return 999
        slide_rels.sort(key=slide_num_from_rel)
        
        print("Slide to Media mapping:")
        for sr in slide_rels:
            slide_num = slide_num_from_rel(sr)
            content = z.read(sr)
            root = ET.fromstring(content)
            
            media_targets = []
            for rel in root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                target = rel.get('Target')
                r_id = rel.get('Id')
                if 'media' in target:
                    # Clean up path
                    media_name = os.path.basename(target)
                    media_targets.append(f"{r_id} -> {media_name}")
            
            print(f"Slide {slide_num}:")
            if media_targets:
                for mt in media_targets:
                    print(f"  - {mt}")
            else:
                print("  - No media files")
else:
    print("PPTX not found.")

import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    with zipfile.ZipFile(pptx_path, 'r') as z:
        slide_files = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
        def slide_number(filename):
            try:
                return int(filename.replace('ppt/slides/slide', '').replace('.xml', ''))
            except:
                return 999
        slide_files.sort(key=slide_number)
        
        output = []
        output.append(f"Found {len(slide_files)} slides:")
        for sf in slide_files:
            slide_xml = z.read(sf)
            root = ET.fromstring(slide_xml)
            texts = []
            for t in root.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t'):
                if t.text and t.text.strip():
                    texts.append(t.text.strip())
            output.append(f"\n=== {sf} ===")
            output.append(" | ".join(texts))
            
        with open('ppt_slides_extracted.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(output))
        print("Wrote extracted slides to ppt_slides_extracted.txt")

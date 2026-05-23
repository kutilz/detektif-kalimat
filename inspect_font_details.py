import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    with zipfile.ZipFile(pptx_path, 'r') as z:
        # presentation.xml
        xml_content = z.read('ppt/presentation.xml')
        root = ET.fromstring(xml_content)
        
        # Define namespaces
        p_ns = 'http://schemas.openxmlformats.org/presentationml/2006/main'
        r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
        
        embedded_font_lsts = root.findall(f'.//{{{p_ns}}}embeddedFontLst')
        print("embeddedFontLst details:")
        for lst in embedded_font_lsts:
            for emb_font in lst.findall(f'.//{{{p_ns}}}embeddedFont'):
                font = emb_font.find(f'{{{p_ns}}}font')
                typeface = font.get('typeface') if font is not None else None
                print(f"Embedded Font typeface: {typeface}")
                
                # Check for relationships in emb_font (regular, bold, italic, boldItalic)
                for child in emb_font:
                    if child.tag != f'{{{p_ns}}}font':
                        print(f"  Child tag: {child.tag}, Attribs: {child.attrib}")
                        r_id = child.get(f'{{http://schemas.openxmlformats.org/officeDocument/2006/relationships}}id')
                        print(f"    r:id = {r_id}")

        # Check relationships in presentation.xml.rels
        rels_content = z.read('ppt/_rels/presentation.xml.rels')
        rels_root = ET.fromstring(rels_content)
        print("\nRelationships in presentation.xml.rels for fonts:")
        for rel in rels_root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
            target = rel.get('Target')
            r_id = rel.get('Id')
            r_type = rel.get('Type')
            if 'font' in target or 'font' in r_type:
                print(f"  Id: {r_id}, Target: {target}, Type: {r_type}")

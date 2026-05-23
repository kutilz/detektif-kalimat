import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    with zipfile.ZipFile(pptx_path, 'r') as z:
        xml_content = z.read('ppt/slides/slide3.xml')
        root = ET.fromstring(xml_content)
        
        print("Detailed elements in Slide 3:")
        for el in root.iter():
            tag_local = el.tag.split('}')[-1]
            if tag_local in ['pic', 'blip', 'cNvPr', 'sp']:
                name = el.get('name', 'N/A')
                descr = el.get('descr', 'N/A')
                r_embed = el.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed', 'N/A')
                print(f"  Tag: {tag_local}, Name: {name}, Descr: {descr}, Embed: {r_embed}, Attribs: {el.attrib}")
else:
    print("PPTX not found.")

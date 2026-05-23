import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    with zipfile.ZipFile(pptx_path, 'r') as z:
        # Check Slide 3 XML
        xml_content = z.read('ppt/slides/slide3.xml')
        root = ET.fromstring(xml_content)
        
        # Print all tags and attributes that contain text or look interesting
        print("Scanning all tags in Slide 3:")
        found_elements = False
        for el in root.iter():
            # If tag has text
            if el.text and el.text.strip():
                print(f"Tag: {el.tag}, Text: '{el.text.strip()}'")
                found_elements = True
            # Print attributes that might contain text
            for name, val in el.attrib.items():
                if 'val' in name or 'descr' in name or 'title' in name:
                    if val.strip():
                        print(f"Tag: {el.tag}, Attrib {name}: '{val}'")
                        found_elements = True
        if not found_elements:
            print("No text elements found in Slide 3 XML.")
else:
    print("PPTX not found.")

import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    with zipfile.ZipFile(pptx_path, 'r') as z:
        # Search for FontKey or embeddedFont elements in all XML files
        for name in z.namelist():
            if name.endswith('.xml') or name.endswith('.rels'):
                try:
                    content = z.read(name)
                    # We can do a string search first to be fast
                    if b'font' in content.lower() or b'fontKey' in content or b'embed' in content.lower():
                        print(f"Match found in: {name}")
                        # Let's print some lines or context
                        if name == 'ppt/presentation.xml':
                            root = ET.fromstring(content)
                            for child in root.iter():
                                if 'font' in child.tag.lower() or 'embed' in child.tag.lower():
                                    print(f"  Tag: {child.tag}, Attribs: {child.attrib}")
                        elif name.endswith('.rels'):
                            print(f"  Rels contents: {content[:500]}")
                except Exception as e:
                    pass

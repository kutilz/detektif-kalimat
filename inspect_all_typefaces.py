import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    typefaces = set()
    with zipfile.ZipFile(pptx_path, 'r') as z:
        for name in z.namelist():
            if name.startswith('ppt/slides/slide') and name.endswith('.xml'):
                try:
                    content = z.read(name)
                    root = ET.fromstring(content)
                    # Look for typeface attributes in the DrawingML namespace
                    for rPr in root.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}rPr'):
                        # Check latin font
                        latin = rPr.find('{http://schemas.openxmlformats.org/drawingml/2006/main}latin')
                        if latin is not None:
                            typeface = latin.get('typeface')
                            if typeface:
                                typefaces.add(typeface)
                        # Check cs font
                        cs = rPr.find('{http://schemas.openxmlformats.org/drawingml/2006/main}cs')
                        if cs is not None:
                            typeface = cs.get('typeface')
                            if typeface:
                                typefaces.add(typeface)
                except Exception as e:
                    pass
    print("Found the following typefaces in slides:")
    for tf in sorted(typefaces):
        print(f" - {tf}")
else:
    print("PPTX file not found.")

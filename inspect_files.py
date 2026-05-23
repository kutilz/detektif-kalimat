import zipfile
import os
import xml.etree.ElementTree as ET

# 1. Convert slide_content.txt from UTF-16LE to UTF-8
slide_content_path = 'slide_content.txt'
if os.path.exists(slide_content_path):
    try:
        with open(slide_content_path, 'r', encoding='utf-16') as f:
            content = f.read()
        with open('slide_content_utf8.txt', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully converted slide_content.txt to UTF-8 in 'slide_content_utf8.txt'")
    except Exception as e:
        print(f"Error converting slide_content.txt: {e}")

# 2. Inspect DETEKTIF KALIMAT.pptx
pptx_path = 'DETEKTIF KALIMAT.pptx'
if os.path.exists(pptx_path):
    print(f"\nInspecting {pptx_path}...")
    try:
        with zipfile.ZipFile(pptx_path, 'r') as z:
            namelist = z.namelist()
            print(f"Total files in pptx: {len(namelist)}")
            
            # Look for media files
            media_files = [f for f in namelist if 'ppt/media/' in f]
            print(f"Number of media files: {len(media_files)}")
            for f in sorted(media_files)[:10]:
                print(f" - {f} ({z.getinfo(f).file_size} bytes)")
            if len(media_files) > 10:
                print(" ... and more media files")
                
            # Look for font files
            font_files = [f for f in namelist if 'ppt/fonts/' in f or f.endswith('.ttf') or f.endswith('.otf')]
            print(f"Number of font files found: {len(font_files)}")
            for f in font_files:
                print(f" - {f}")
    except Exception as e:
        print(f"Error inspecting pptx: {e}")

# 3. Inspect SOAL SOAL SPO (1).docx
docx_path = 'SOAL SOAL SPO (1).docx'
if os.path.exists(docx_path):
    print(f"\nInspecting {docx_path}...")
    try:
        with zipfile.ZipFile(docx_path, 'r') as z:
            namelist = z.namelist()
            print(f"Total files in docx: {len(namelist)}")
            # Try to read word/document.xml
            if 'word/document.xml' in namelist:
                doc_xml = z.read('word/document.xml')
                # Parse XML to extract text
                root = ET.fromstring(doc_xml)
                # Word XML namespace
                namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                
                # Extract paragraphs
                paragraphs = []
                for p in root.findall('.//w:p', namespaces):
                    p_text = ""
                    for r in p.findall('.//w:r', namespaces):
                        t = r.find('.//w:t', namespaces)
                        if t is not None and t.text:
                            p_text += t.text
                    if p_text.strip():
                        paragraphs.append(p_text.strip())
                
                print(f"Extracted {len(paragraphs)} non-empty paragraphs from DOCX:")
                for i, p in enumerate(paragraphs[:20]):
                    print(f"{i+1}: {p}")
                if len(paragraphs) > 20:
                    print("... and more paragraphs")
                    
                # Write extracted text to docx_content.txt
                with open('docx_content.txt', 'w', encoding='utf-8') as f:
                    for p in paragraphs:
                        f.write(p + '\n')
                print("Wrote extracted DOCX text to 'docx_content.txt'")
    except Exception as e:
        print(f"Error inspecting docx: {e}")

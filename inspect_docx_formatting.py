import zipfile
import xml.etree.ElementTree as ET
import os

docx_path = 'SOAL SOAL SPO (1).docx'
if os.path.exists(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as z:
            doc_xml = z.read('word/document.xml')
            root = ET.fromstring(doc_xml)
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            print("Inspecting DOCX runs and formatting:")
            for p_idx, p in enumerate(root.findall('.//w:p', namespaces)):
                runs_info = []
                for r in p.findall('.//w:r', namespaces):
                    t = r.find('.//w:t', namespaces)
                    if t is not None and t.text:
                        # Check formatting properties
                        rPr = r.find('.//w:rPr', namespaces)
                        formatting = []
                        if rPr is not None:
                            if rPr.find('.//w:b', namespaces) is not None:
                                formatting.append('bold')
                            if rPr.find('.//w:i', namespaces) is not None:
                                formatting.append('italic')
                            color = rPr.find('.//w:color', namespaces)
                            if color is not None:
                                formatting.append(f"color:{color.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')}")
                            highlight = rPr.find('.//w:highlight', namespaces)
                            if highlight is not None:
                                formatting.append(f"highlight:{highlight.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')}")
                        
                        fmt_str = ",".join(formatting) if formatting else "none"
                        runs_info.append(f"'{t.text}' [{fmt_str}]")
                
                p_text = "".join(r.find('.//w:t', namespaces).text for r in p.findall('.//w:r', namespaces) if r.find('.//w:t', namespaces) is not None)
                if p_text.strip():
                    print(f"Paragraph {p_idx+1}: {p_text}")
                    print(f"  Runs: {' | '.join(runs_info)}")
    except Exception as e:
        print(f"Error: {e}")

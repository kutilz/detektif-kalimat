import zipfile
import os

pptx_path = 'DETEKTIF KALIMAT.pptx'
dest_dir = 'images'
os.makedirs(dest_dir, exist_ok=True)

if os.path.exists(pptx_path):
    extracted_count = 0
    with zipfile.ZipFile(pptx_path, 'r') as z:
        for name in z.namelist():
            if name.startswith('ppt/media/'):
                filename = os.path.basename(name)
                if filename:  # Ignore directories if any
                    dest_path = os.path.join(dest_dir, filename)
                    # Extract the file content
                    try:
                        with open(dest_path, 'wb') as f:
                            f.write(z.read(name))
                        extracted_count += 1
                        print(f"Extracted {name} to {dest_path}")
                    except Exception as e:
                        print(f"Failed to extract {name}: {e}")
    print(f"\nSuccessfully extracted {extracted_count} media files to the '{dest_dir}' directory.")
else:
    print("PPTX file not found.")

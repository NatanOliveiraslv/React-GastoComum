import { FiCamera, FiUpload, FiTrash2 } from "react-icons/fi";
import { useRef, useState } from "react";

function InputFile({ onFileChange }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);


      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        if (onFileChange) onFileChange(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileChange) onFileChange(null); // 👈 avisa que não há mais arquivo
  };

  return (
    <div className="mt-6 mb-4">
      <h2 className="text-base font-semibold mb-2">Receipt</h2>
      <div className="border rounded-xl p-4 bg-white">

        <div className="flex items-center justify-between mb-4">
          <FiCamera className="text-gray-400" />
        </div>

        {!selectedFile ? (
          <>
            {/* Campo de upload visível apenas se não houver arquivo */}
            <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center text-center">
              <FiUpload className="text-2xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Arraste e solte arquivos ou</p>
              <button
                type="button"
                onClick={handleButtonClick}
                className="text-sm text-indigo-600 hover:underline font-medium mt-1"
              >
                Navegue
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Formatos suportados: JPG, PNG, PDF (máx. 5 MB)
            </p>
          </>
        ) : (
          <>
            {/* Exibição do arquivo selecionado */}
            <div className="text-center mt-2">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Arquivo selecionado:
              </p>

              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mx-auto max-h-48 rounded-md shadow mb-2"
                />
              ) : (
                <p className="text-sm text-gray-600 mb-2">{selectedFile.name}</p>
              )}

              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 flex items-center justify-center gap-1 text-sm hover:underline mx-auto"
              >
                <FiTrash2 />
                Remover arquivo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InputFile;

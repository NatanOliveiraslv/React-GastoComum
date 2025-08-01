import { FaRegFilePdf } from "react-icons/fa6";

const File = ({ fileName }) => {
  const receiptUrl = `${process.env.REACT_APP_BASE_URL}/spending/voucher/download/${fileName}`

  return (
    <div>
      {receiptUrl ? (
        <>
          {/* Tenta exibir como imagem se for um tipo comum */}
          {(receiptUrl.endsWith('.png') || receiptUrl.endsWith('.jpg') || receiptUrl.endsWith('.jpeg')) && (
            <img
              src={receiptUrl}
              alt="Comprovante"
              style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ccc', objectFit: 'contain' }}
            />
          )}

          {/* Tenta exibir como PDF se for PDF */}
          {receiptUrl.endsWith('.pdf') && (
            <div className="flex flex-col items-center space-y-4">
              <FaRegFilePdf className="text-4xl text-red-600" />

              <button
                onClick={() => window.open(receiptUrl, '_blank')}
                className="w-full bg-violet-700 text-white py-3 px-6 text-base font-medium hover:bg-violet-800 transition-colors"
              >
                Ver Comprovante
              </button>
            </div>
          )}

          {/* Para outros tipos ou fallback, oferece um link de download */}
          {!(receiptUrl.endsWith('.png') || receiptUrl.endsWith('.jpg') || receiptUrl.endsWith('.jpeg') || receiptUrl.endsWith('.pdf')) && (
            <p>
              Comprovante disponível: <a href={receiptUrl} target="_blank" rel="noopener noreferrer">Baixar Arquivo</a>
            </p>
          )}
        </>
      ) : (
        <p>Nenhum arquivo disponível.</p>
      )}
    </div>
  );
}

export default File;
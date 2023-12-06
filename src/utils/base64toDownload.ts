export function base64toOpen(base64: string, nameFile: string) {
  const linkSource = base64;
  const downloadLink = document.createElement('a');
  const fileName = nameFile;
  downloadLink.download = fileName;
  downloadLink.target = '_blank';
  // downloadLink.click();
  const pdfWindow = window.open('');
  pdfWindow?.document?.write(
    `<html<head><title>${fileName}</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>`,
  );
  pdfWindow?.document?.write(
    `<iframe width='100%' height='100%' src='${encodeURI(
      linkSource,
    )}'></iframe>`,
  );
}

import Tesseract from 'tesseract.js';

export const extractReferenceNo = async (imageUri) => {
    console.log("==imageURI", imageUri)
  try {
    const { data: { text } } = await Tesseract.recognize(imageUri, 'eng');
    const referenceNo = text.match(/Reference No: (\w+)/)?.[1];
    return referenceNo;
  } catch (error) {
    throw new Error('OCR failed: ' + error.message);
  }
};
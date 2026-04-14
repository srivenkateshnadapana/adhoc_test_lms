import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export interface CertificateData {
  name: string
  courseTitle: string
  date: string
  certId: string
}

export async function generateCertificatePDF(data: CertificateData) {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()
  
  // Embed standard fonts
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  
  // Fetch the 4K Premium Template
  const imgUrl = '/certificate-template-premium.png'
  let bgImage;
  let page;
  let width, height;

  try {
    const imgBytes = await fetch(imgUrl).then((res) => {
        if (!res.ok) throw new Error("Template image not found");
        return res.arrayBuffer();
    });
    
    // Support PNG/JPG formats
    try {
      bgImage = await pdfDoc.embedPng(imgBytes)
    } catch {
      bgImage = await pdfDoc.embedJpg(imgBytes)
    }

    // High Resolution PDF sizing matching the 4K image aspect ratio
    page = pdfDoc.addPage([bgImage.width, bgImage.height])
    width = bgImage.width
    height = bgImage.height

    page.drawImage(bgImage, { x: 0, y: 0, width, height })
  } catch(e) {
    console.error("PDF Template loading failed:", e)
    // Fallback to high-res landscape A4
    page = pdfDoc.addPage([1122.5, 793.7]) 
    width = 1122.5
    height = 793.7
    
    // Draw an elegant background if image fails
    page.drawRectangle({
      x: 0, y: 0, width, height,
      color: rgb(0.04, 0.08, 0.15) // Deep Navy
    })
  }
  
  // --- Dynamic Content Layering ---
  
  // 1. Recipient Name (Center-Main)
  const nameLabel = "THIS CERTIFICATE IS PROUDLY PRESENTED TO"
  const labelSize = width * 0.012
  const labelWidth = helvetica.widthOfTextAtSize(nameLabel, labelSize)
  page.drawText(nameLabel, {
    x: width / 2 - labelWidth / 2,
    y: height * 0.58,
    size: labelSize,
    font: helvetica,
    color: rgb(0.7, 0.7, 0.7), // Light Gray
  })

  const nameSize = width * 0.05
  const nameWidth = timesBold.widthOfTextAtSize(data.name, nameSize)
  page.drawText(data.name, {
    x: width / 2 - nameWidth / 2,
    y: height * 0.48,
    size: nameSize,
    font: timesBold,
    color: rgb(0.84, 0.69, 0.34), // Premium Gold
  })

  // 2. Course Title
  const courseLabel = "For successfully completing the comprehensive program in"
  const courseLabelSize = width * 0.012
  const cLabelWidth = helvetica.widthOfTextAtSize(courseLabel, courseLabelSize)
  page.drawText(courseLabel, {
    x: width / 2 - cLabelWidth / 2,
    y: height * 0.40,
    size: courseLabelSize,
    font: helvetica,
    color: rgb(0.7, 0.7, 0.7),
  })

  const titleSize = width * 0.025
  const titleWidth = helveticaBold.widthOfTextAtSize(data.courseTitle, titleSize)
  page.drawText(data.courseTitle, {
    x: width / 2 - titleWidth / 2,
    y: height * 0.34,
    size: titleSize,
    font: helveticaBold,
    color: rgb(1, 1, 1), // Pure White
  })

  // 3. Date and ID (Lower section)
  const metaY = height * 0.16
  const metaSize = width * 0.012
  
  // Date (Left aligned with signature area)
  page.drawText(`ISSUED ON: ${data.date}`, {
    x: width * 0.15,
    y: metaY,
    size: metaSize,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  })

  // ID (Right aligned with Seal area)
  const idText = `VERIFICATION ID: ${data.certId}`
  const idWidth = helvetica.widthOfTextAtSize(idText, metaSize)
  page.drawText(idText, {
    x: width * 0.85 - idWidth,
    y: metaY,
    size: metaSize,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  })

  // 4. Authorized Signature (Native Drawing)
  const sigX = width * 0.20
  const sigY = height * 0.20
  page.drawText("Marcus Vondrake", {
    x: sigX,
    y: sigY,
    size: width * 0.02,
    font: timesItalic,
    color: rgb(1, 1, 1),
  })
  page.drawText("DIRECTOR OF ACADEMICS", {
    x: sigX,
    y: sigY - 15,
    size: width * 0.008,
    font: helveticaBold,
    color: rgb(0.84, 0.69, 0.34),
  })

  // --- Universal Compatible Download Trigger ---
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
  
  // Explicitly safe filename
  const safeName = data.name.replace(/[^a-z0-9]/gi, '_').substring(0, 50)
  const fileName = `${safeName}_Official_Certificate.pdf`
  
  const link = document.createElement('a')
  link.href = pdfDataUri
  link.setAttribute('download', fileName)
  
  // For maximum compatibility across all browsers
  document.body.appendChild(link)
  link.click()
  
  // Clean up the DOM element
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link)
    }
  }, 1000)
}

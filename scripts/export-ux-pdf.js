/* eslint-disable no-console */
const fs = require("fs")
const path = require("path")
const { PDFDocument } = require("pdf-lib")

// Source images come from Cursor's workspaceStorage assets.
// Kept outside your LMS `public/` folder so it isn't exposed in the portal.
const assetsDir =
  "C:\\Users\\bndev\\.cursor\\projects\\c-Users-bndev-OneDrive-Desktop-ADHOC-LMS\\assets"

const outDir = path.join(process.cwd(), "design-exports")
const outPath = path.join(outDir, "AdHocLMS_Figma_UX.pdf")

function listUiUxPngs() {
  const files = fs.readdirSync(assetsDir, { withFileTypes: true })
  const pngs = files
    .filter((f) => f.isFile())
    .map((f) => f.name)
    .filter(
      (name) =>
        name.includes("AdHocLMS_UI_UX_Design_page-") && name.toLowerCase().endsWith(".png")
    )

  const re = /AdHocLMS_UI_UX_Design_page-(\d+)-/
  pngs.sort((a, b) => {
    const am = a.match(re)
    const bm = b.match(re)
    const an = am ? Number(am[1]) : 0
    const bn = bm ? Number(bm[1]) : 0
    if (an !== bn) return an - bn
    return a.localeCompare(b)
  })

  return pngs
}

async function main() {
  if (!fs.existsSync(assetsDir)) {
    throw new Error(`Assets directory not found: ${assetsDir}`)
  }

  const pngFiles = listUiUxPngs()
  if (pngFiles.length === 0) {
    throw new Error("No UI UX design PNGs found to export.")
  }

  fs.mkdirSync(outDir, { recursive: true })

  const pdfDoc = await PDFDocument.create()

  // A4 at 72dpi: 595.28 x 841.89
  const pageWidth = 595.28
  const pageHeight = 841.89

  for (const fileName of pngFiles) {
    const filePath = path.join(assetsDir, fileName)
    const imgBytes = fs.readFileSync(filePath)
    // These assets have a `.png` extension but are JPEG-encoded (PNG signature check fails),
    // so we detect by file signature and embed accordingly.
    const sig = imgBytes.slice(0, 2).toString("hex").toLowerCase()
    const isJpeg = sig === "ffd8"

    const img = isJpeg ? await pdfDoc.embedJpg(imgBytes) : await pdfDoc.embedPng(imgBytes)

    const page = pdfDoc.addPage([pageWidth, pageHeight])
    const imgW = img.width
    const imgH = img.height

    const scale = Math.min(pageWidth / imgW, pageHeight / imgH)
    const drawW = imgW * scale
    const drawH = imgH * scale
    const x = (pageWidth - drawW) / 2
    const y = (pageHeight - drawH) / 2

    page.drawImage(img, {
      x,
      y,
      width: drawW,
      height: drawH,
    })
  }

  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync(outPath, pdfBytes)

  console.log(`Exported PDF: ${outPath}`)
  console.log(`Included ${pngFiles.length} design page(s).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


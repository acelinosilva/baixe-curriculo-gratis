import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { ResumeData } from '../types';

/**
 * Exports the resume rendered in the DOM to high-resolution, print-ready A4 PDF.
 * Uses html-to-image which natively supports modern CSS features, OKLCH colors, and custom fonts.
 */
export async function exportResumeToPdf(
  elementId: string,
  fileName: string = 'curriculo'
): Promise<boolean> {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  // Create an off-screen fixed container to render the exact A4 layout (794px width standard 96 DPI A4)
  // This bypasses any parent viewport transforms (zoomScale) and hidden mobile displays
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '0';
  wrapper.style.left = '-9999px';
  wrapper.style.width = '794px';
  wrapper.style.backgroundColor = '#ffffff';
  wrapper.style.zIndex = '-99999';
  wrapper.style.pointerEvents = 'none';
  wrapper.style.margin = '0';
  wrapper.style.padding = '0';
  wrapper.style.display = 'block';
  wrapper.style.visibility = 'visible';
  wrapper.style.opacity = '1';

  // Clone the element so we don't disturb the live editor
  const clone = originalElement.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.margin = '0 auto';
  clone.style.width = '794px';
  clone.style.boxShadow = 'none';
  clone.style.display = 'flex';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    // Small delay to let browser lay out cloned nodes and fonts
    await new Promise(resolve => setTimeout(resolve, 100));

    let imgData: string;

    // Primary attempt: high-fidelity PNG with 2x pixel ratio for razor-sharp text
    try {
      imgData = await toPng(clone, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: false,
      });
    } catch (primaryErr) {
      console.warn('html-to-image PNG pass had issue, attempting with skipFonts: true', primaryErr);
      try {
        imgData = await toPng(clone, {
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          skipFonts: true,
        });
      } catch (secondaryErr) {
        console.warn('html-to-image fallback to JPEG', secondaryErr);
        imgData = await toJpeg(clone, {
          quality: 0.96,
          pixelRatio: 1.8,
          backgroundColor: '#ffffff',
          skipFonts: true,
        });
      }
    }

    if (!imgData) {
      throw new Error('Could not convert resume DOM to image data.');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

    const elementHeightPx = clone.offsetHeight || 1123;
    const elementWidthPx = clone.offsetWidth || 794;
    const calculatedHeightMm = (elementHeightPx * pdfWidth) / elementWidthPx;

    // Single-page or multi-page handling
    if (calculatedHeightMm <= pdfHeight + 3) {
      // Single A4 page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(calculatedHeightMm, pdfHeight), undefined, 'FAST');
    } else {
      // Multi-page document
      let heightLeft = calculatedHeightMm;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, calculatedHeightMm, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 5) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, calculatedHeightMm, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    // Build clean filename without site name
    const safeName = (fileName || 'curriculo')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const finalFileName = safeName ? `curriculo-${safeName}.pdf` : 'curriculo.pdf';

    // Reliable browser download trigger using Blob URL
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = finalFileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 2000);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // As a user-friendly fallback, try opening browser print window
    window.print();
    return false;
  } finally {
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  }
}

/**
 * Generates an editable document compatible with Microsoft Word (.doc), LibreOffice, and Google Docs.
 * Completely free of site watermarks.
 */
export function exportResumeToWord(data: ResumeData): void {
  const safeName = (data.personalInfo.fullName || 'curriculo')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const finalFileName = safeName ? `curriculo-${safeName}.doc` : 'curriculo.doc';

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${data.personalInfo.fullName || 'Currículo Profissional'}</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; color: #1e293b; margin: 1in; }
        h1 { font-size: 20pt; color: #0f172a; margin-bottom: 4pt; text-transform: uppercase; letter-spacing: 0.5pt; }
        h2 { font-size: 13pt; color: #0f766e; border-bottom: 1.5pt solid #0f766e; padding-bottom: 2pt; margin-top: 14pt; margin-bottom: 6pt; text-transform: uppercase; }
        h3 { font-size: 11pt; color: #1e293b; margin: 0; font-weight: bold; }
        p { margin: 0 0 4pt 0; }
        .contact-info { font-size: 10pt; color: #475569; margin-bottom: 12pt; }
        .job-title { font-size: 13pt; color: #334155; font-weight: 600; margin-bottom: 4pt; }
        .date { font-size: 10pt; color: #64748b; font-style: italic; }
        ul { margin-top: 3pt; margin-bottom: 6pt; padding-left: 18pt; }
        li { margin-bottom: 2pt; }
      </style>
    </head>
    <body>
      <h1>${data.personalInfo.fullName || 'Seu Nome Completo'}</h1>
      <div class="job-title">${data.personalInfo.jobTitle || 'Cargo / Área de Atuação'}</div>
      <div class="contact-info">
        ${[
          data.personalInfo.email,
          data.personalInfo.phone,
          data.personalInfo.location,
          data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin}` : '',
          data.personalInfo.website ? `Portfólio: ${data.personalInfo.website}` : ''
        ].filter(Boolean).join('  |  ')}
      </div>

      ${data.summary ? `
        <h2>Resumo Profissional</h2>
        <p>${data.summary}</p>
      ` : ''}

      ${data.experiences && data.experiences.length > 0 ? `
        <h2>Experiência Profissional</h2>
        ${data.experiences.map(exp => `
          <div style="margin-bottom: 10pt;">
            <table width="100%" style="border-collapse: collapse;">
              <tr>
                <td align="left"><h3>${exp.role} — ${exp.company}</h3></td>
                <td align="right" class="date">${exp.startDate} – ${exp.current ? 'Presente' : exp.endDate}</td>
              </tr>
            </table>
            ${exp.location ? `<p style="font-size: 9.5pt; color: #64748b;">${exp.location}</p>` : ''}
            <p>${exp.description}</p>
            ${exp.achievements && exp.achievements.length > 0 ? `
              <ul>
                ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${data.education && data.education.length > 0 ? `
        <h2>Formação Acadêmica</h2>
        ${data.education.map(edu => `
          <div style="margin-bottom: 8pt;">
            <table width="100%" style="border-collapse: collapse;">
              <tr>
                <td align="left"><h3>${edu.degree} em ${edu.fieldOfStudy}</h3></td>
                <td align="right" class="date">${edu.startDate} – ${edu.current ? 'Em andamento' : edu.endDate}</td>
              </tr>
            </table>
            <p style="color: #475569;">${edu.institution}</p>
            ${edu.description ? `<p style="font-size: 9.5pt; color: #64748b;">${edu.description}</p>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${data.skills && data.skills.length > 0 ? `
        <h2>Habilidades & Competências</h2>
        <p>${data.skills.join('  •  ')}</p>
      ` : ''}

      ${data.languages && data.languages.length > 0 ? `
        <h2>Idiomas</h2>
        <p>${data.languages.map(l => `${l.language} (${l.proficiency})`).join('  •  ')}</p>
      ` : ''}

      ${data.certifications && data.certifications.length > 0 ? `
        <h2>Cursos & Certificações</h2>
        <ul>
          ${data.certifications.map(c => `<li><strong>${c.name}</strong> — ${c.issuer} (${c.year})</li>`).join('')}
        </ul>
      ` : ''}

      ${data.projects && data.projects.length > 0 ? `
        <h2>Projetos Relevantes</h2>
        ${data.projects.map(p => `
          <div style="margin-bottom: 8pt;">
            <table width="100%" style="border-collapse: collapse;">
              <tr>
                <td align="left"><h3>${p.title}</h3></td>
                ${p.link ? `<td align="right" class="date">${p.link}</td>` : ''}
              </tr>
            </table>
            ${p.roleOrTech ? `<p style="font-size: 9.5pt; color: #64748b;"><em>Tecnologias / Função: ${p.roleOrTech}</em></p>` : ''}
            <p>${p.description}</p>
          </div>
        `).join('')}
      ` : ''}

      ${data.volunteer && data.volunteer.length > 0 ? `
        <h2>Trabalho Voluntário / Social</h2>
        ${data.volunteer.map(v => `
          <div style="margin-bottom: 8pt;">
            <table width="100%" style="border-collapse: collapse;">
              <tr>
                <td align="left"><h3>${v.role} — ${v.organization}</h3></td>
                ${v.startDate ? `<td align="right" class="date">${v.startDate}${v.endDate ? ` – ${v.endDate}` : ''}</td>` : ''}
              </tr>
            </table>
            <p>${v.description}</p>
          </div>
        `).join('')}
      ` : ''}

      ${data.customSections && data.customSections.length > 0 ? `
        ${data.customSections.map(sec => `
          <h2>${sec.title}</h2>
          ${sec.items.map(it => `
            <div style="margin-bottom: 6pt;">
              <table width="100%" style="border-collapse: collapse;">
                <tr>
                  <td align="left"><h3>${it.title}</h3></td>
                  ${it.date ? `<td align="right" class="date">${it.date}</td>` : ''}
                </tr>
              </table>
              ${it.subtitle ? `<p style="font-size: 9.5pt; color: #64748b;"><em>${it.subtitle}</em></p>` : ''}
              ${it.description ? `<p>${it.description}</p>` : ''}
            </div>
          `).join('')}
        `).join('')}
      ` : ''}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = finalFileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(link.href);
  }, 1500);
}

/**
 * Generates clean, ATS-optimized plain text for copy-pasting into job application forms (Gupy, Kenoby, LinkedIn)
 */
export function generateCleanAtsText(data: ResumeData): string {
  const parts: string[] = [];

  parts.push(data.personalInfo.fullName.toUpperCase());
  if (data.personalInfo.jobTitle) parts.push(data.personalInfo.jobTitle);
  
  const contacts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.linkedin,
    data.personalInfo.website
  ].filter(Boolean);
  if (contacts.length) parts.push(contacts.join(' | '));

  parts.push('\n--- OBJETIVO / RESUMO PROFISSIONAL ---');
  parts.push(data.summary || 'Não informado.');

  if (data.experiences && data.experiences.length) {
    parts.push('\n--- EXPERIÊNCIA PROFISSIONAL ---');
    data.experiences.forEach(exp => {
      parts.push(`${exp.role} | ${exp.company} (${exp.startDate} - ${exp.current ? 'Presente' : exp.endDate})`);
      if (exp.location) parts.push(`Localidade: ${exp.location}`);
      if (exp.description) parts.push(exp.description);
      if (exp.achievements?.length) {
        exp.achievements.forEach(a => parts.push(`• ${a}`));
      }
      parts.push('');
    });
  }

  if (data.education && data.education.length) {
    parts.push('\n--- FORMAÇÃO ACADÊMICA ---');
    data.education.forEach(edu => {
      parts.push(`${edu.degree} em ${edu.fieldOfStudy} | ${edu.institution}`);
      parts.push(`Período: ${edu.startDate} - ${edu.current ? 'Em andamento' : edu.endDate}`);
      if (edu.description) parts.push(edu.description);
      parts.push('');
    });
  }

  if (data.skills && data.skills.length) {
    parts.push('\n--- PRINCIPAIS COMPETÊNCIAS ---');
    parts.push(data.skills.join(', '));
  }

  if (data.languages && data.languages.length) {
    parts.push('\n--- IDIOMAS ---');
    parts.push(data.languages.map(l => `${l.language}: ${l.proficiency}`).join(' | '));
  }

  if (data.certifications && data.certifications.length) {
    parts.push('\n--- CURSOS E CERTIFICAÇÕES ---');
    data.certifications.forEach(c => parts.push(`• ${c.name} - ${c.issuer} (${c.year})`));
  }

  if (data.projects && data.projects.length) {
    parts.push('\n--- PROJETOS ---');
    data.projects.forEach(p => {
      parts.push(`${p.title}${p.roleOrTech ? ` (${p.roleOrTech})` : ''}`);
      if (p.link) parts.push(`Link: ${p.link}`);
      if (p.description) parts.push(p.description);
      parts.push('');
    });
  }

  if (data.volunteer && data.volunteer.length) {
    parts.push('\n--- VOLUNTARIADO ---');
    data.volunteer.forEach(v => {
      parts.push(`${v.role} | ${v.organization} (${v.startDate}${v.endDate ? ` - ${v.endDate}` : ''})`);
      if (v.description) parts.push(v.description);
      parts.push('');
    });
  }

  if (data.customSections && data.customSections.length) {
    data.customSections.forEach(sec => {
      parts.push(`\n--- ${sec.title.toUpperCase()} ---`);
      sec.items.forEach(it => {
        parts.push(`${it.title}${it.date ? ` (${it.date})` : ''}`);
        if (it.subtitle) parts.push(it.subtitle);
        if (it.description) parts.push(it.description);
        parts.push('');
      });
    });
  }

  return parts.join('\n');
}

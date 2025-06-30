import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Persona, StrategyRecommendation, ProductInput } from '../types';

export const exportPersonasToPDF = async (
  personas: Persona[],
  strategies: StrategyRecommendation[],
  productName: string,
  productInput?: ProductInput | null
) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${productName} - User Personas & Strategy Report`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Date
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 25;

  // Project Summary Section
  if (productInput) {
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Project Summary', 20, yPosition);
    yPosition += 15;

    // Product Name & Description
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Product: ${productInput.name}`, 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const descLines = pdf.splitTextToSize(productInput.description, pageWidth - 40);
    pdf.text(descLines, 20, yPosition);
    yPosition += descLines.length * 4 + 8;

    // Target Audience
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Target Audience:', 20, yPosition);
    yPosition += 6;
    pdf.setFont('helvetica', 'normal');
    const audienceLines = pdf.splitTextToSize(productInput.targetAudience, pageWidth - 40);
    pdf.text(audienceLines, 20, yPosition);
    yPosition += audienceLines.length * 4 + 8;

    // Key Features
    pdf.setFont('helvetica', 'bold');
    pdf.text('Key Features:', 20, yPosition);
    yPosition += 6;
    pdf.setFont('helvetica', 'normal');
    const featuresLines = pdf.splitTextToSize(productInput.keyFeatures, pageWidth - 40);
    pdf.text(featuresLines, 20, yPosition);
    yPosition += featuresLines.length * 4 + 8;

    // Pain Points
    pdf.setFont('helvetica', 'bold');
    pdf.text('User Pain Points:', 20, yPosition);
    yPosition += 6;
    pdf.setFont('helvetica', 'normal');
    const painLines = pdf.splitTextToSize(productInput.painPoints, pageWidth - 40);
    pdf.text(painLines, 20, yPosition);
    yPosition += painLines.length * 4 + 15;

    // Supporting Materials
    if ((productInput.documents && productInput.documents.length > 0) || 
        (productInput.links && productInput.links.length > 0)) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Supporting Materials:', 20, yPosition);
      yPosition += 6;

      if (productInput.documents && productInput.documents.length > 0) {
        pdf.setFont('helvetica', 'normal');
        pdf.text('Documents:', 25, yPosition);
        yPosition += 5;
        productInput.documents.forEach((doc) => {
          pdf.text(`• ${doc.name}`, 30, yPosition);
          yPosition += 4;
        });
        yPosition += 3;
      }

      if (productInput.links && productInput.links.length > 0) {
        pdf.setFont('helvetica', 'normal');
        pdf.text('Reference Links:', 25, yPosition);
        yPosition += 5;
        productInput.links.forEach((link) => {
          const linkLines = pdf.splitTextToSize(`• ${link}`, pageWidth - 50);
          pdf.text(linkLines, 30, yPosition);
          yPosition += linkLines.length * 4;
        });
      }
      yPosition += 10;
    }
  }

  // New page for personas
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = 20;
  }

  // Personas Section
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('User Personas', 20, yPosition);
  yPosition += 15;

  personas.forEach((persona, index) => {
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    // Persona Header
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${persona.name}`, 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${persona.age} years old, ${persona.occupation} | ${persona.location}`, 20, yPosition);
    yPosition += 8;

    // Bio
    pdf.setFontSize(10);
    const bioLines = pdf.splitTextToSize(persona.bio, pageWidth - 40);
    pdf.text(bioLines, 20, yPosition);
    yPosition += bioLines.length * 4 + 5;

    // Quote
    pdf.setFont('helvetica', 'italic');
    const quoteLines = pdf.splitTextToSize(`"${persona.quote}"`, pageWidth - 40);
    pdf.text(quoteLines, 20, yPosition);
    yPosition += quoteLines.length * 4 + 8;

    // Scenario
    pdf.setFont('helvetica', 'bold');
    pdf.text('Scenario:', 20, yPosition);
    yPosition += 5;
    pdf.setFont('helvetica', 'normal');
    const scenarioLines = pdf.splitTextToSize(persona.scenario, pageWidth - 40);
    pdf.text(scenarioLines, 20, yPosition);
    yPosition += scenarioLines.length * 4 + 5;

    // Job to Be Done
    pdf.setFont('helvetica', 'bold');
    pdf.text('Job to Be Done:', 20, yPosition);
    yPosition += 5;
    pdf.setFont('helvetica', 'normal');
    const jobLines = pdf.splitTextToSize(`"${persona.jobToBeDone}"`, pageWidth - 40);
    pdf.text(jobLines, 20, yPosition);
    yPosition += jobLines.length * 4 + 5;

    // Success Criteria
    pdf.setFont('helvetica', 'bold');
    pdf.text('Success Criteria:', 20, yPosition);
    yPosition += 5;
    pdf.setFont('helvetica', 'normal');
    const successLines = pdf.splitTextToSize(`"${persona.successCriteria}"`, pageWidth - 40);
    pdf.text(successLines, 20, yPosition);
    yPosition += successLines.length * 4 + 5;

    // Goals & Frustrations in two columns
    const midPoint = pageWidth / 2;
    
    // Goals (left column)
    pdf.setFont('helvetica', 'bold');
    pdf.text('Goals:', 20, yPosition);
    let goalY = yPosition + 5;
    pdf.setFont('helvetica', 'normal');
    persona.goals.forEach((goal) => {
      const goalLines = pdf.splitTextToSize(`• ${goal}`, midPoint - 30);
      pdf.text(goalLines, 25, goalY);
      goalY += goalLines.length * 4 + 2;
    });

    // Frustrations (right column)
    pdf.setFont('helvetica', 'bold');
    pdf.text('Frustrations:', midPoint + 10, yPosition);
    let frustY = yPosition + 5;
    pdf.setFont('helvetica', 'normal');
    persona.frustrations.forEach((frustration) => {
      const frustLines = pdf.splitTextToSize(`• ${frustration}`, midPoint - 30);
      pdf.text(frustLines, midPoint + 15, frustY);
      frustY += frustLines.length * 4 + 2;
    });

    yPosition = Math.max(goalY, frustY) + 15;
  });

  // Strategies Section
  if (strategies.length > 0) {
    pdf.addPage();
    yPosition = 20;

    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Strategic Recommendations', 20, yPosition);
    yPosition += 15;

    strategies.forEach((strategy, index) => {
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      // Strategy Header
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${strategy.title}`, 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Category: ${strategy.category} | Priority: ${strategy.priority}`, 20, yPosition);
      yPosition += 8;

      // Description
      const descLines = pdf.splitTextToSize(strategy.description, pageWidth - 40);
      pdf.text(descLines, 20, yPosition);
      yPosition += descLines.length * 4 + 8;

      // Action Items
      pdf.setFont('helvetica', 'bold');
      pdf.text('Action Items:', 20, yPosition);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      strategy.actionItems.forEach((item) => {
        const itemLines = pdf.splitTextToSize(`• ${item}`, pageWidth - 40);
        pdf.text(itemLines, 25, yPosition);
        yPosition += itemLines.length * 4 + 3;
      });

      yPosition += 10;
    });
  }

  // Save the PDF
  const filename = `${productName.replace(/\s+/g, '_')}_Personas_Strategy_Report.pdf`;
  pdf.save(filename);
};

export const exportElementToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
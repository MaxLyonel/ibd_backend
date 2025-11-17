import { Injectable } from "@nestjs/common";
import { Response } from "express";
import PDFDocument from 'pdfkit';
import { ReportService } from "src/modules/consolidate-bachelors/domain/ports/outbound/report.service";

@Injectable()
export class ReportServiceImpl implements ReportService {
  async generateDeclaracionJurada(formData: any, res: Response): Promise<void> {
    try {
      const doc = new PDFDocument({
        margin: 30,
        size: 'A4',
        layout: 'landscape'
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=declaracion-jurada.pdf');
      doc.pipe(res);

      // Generar contenido
      await this.generateHeader(doc, formData);
      this.generateInstitutionData(doc, formData);
      this.generateFemaleGradesTable(doc, formData);
      this.generateSelectedStudent(doc, formData);
      this.generateFooter(doc, formData);

      doc.end();

      doc.on('error', (err) => {
        console.error('Error durante el envío del PDF: ', err);
      });
    } catch(error) {
      console.error('Error antes de enviar PDF: ', error);
      if(!res.headersSent) {
        res.status(500).json({ status: 'error', message: error.message });
      }
    }
  }

  private async generateHeader(doc: PDFKit.PDFDocument, data: any) {
    // Título principal
    doc.fontSize(8)
       .font('./fonts/Montserrat-Bold.ttf')
       .text('SUB SISTEMA DE EDUCACIÓN REGULAR', 50, 35, { align: 'center' })
       .text('FORMULARIO DE DECLARACIÓN JURADA - ASENTIMIENTO SOBRE EL CALCULO AUTOMATICO', 50, 45, { align: 'center' })
       .text('DEL BACHILLER DESTACADO', 50, 55, { align: 'center' });

    // Subtítulo
    doc.fontSize(8)
       .font('./fonts/Lato-Regular.ttf')
       .text('BACHILLER DESTACADO - EXCELENCIA EN EL BACHILLERATO (GESTIÓN 2024)', 50, 70, { align: 'center' })
       .font('./fonts/Lato-Regular.ttf')

    // Descripción
    doc.fontSize(6)
       .font('./fonts/Lato-Regular.ttf')
       .text('Los datos presentados en el presente reporte para determinar al bachiller destacado están calculados con base en la información reportada en el cierre operativo del 6to año de secundaria. El director debe verificar y certificar que los datos y los cálculos han sido elaborados correctamente conforme a la normativa vigente.', 50, 100, { 
         width: 700,
         align: 'justify'
       });
  }

  private generateSectionTitle(doc: PDFKit.PDFDocument, title: string, x: number, y: number, width: number) {
    const sectionHeight = 15; // Altura del fondo
    // Fondo gris para esta sección específica
    doc.fillColor('#e0e0e0') // Color gris plomo
        .rect(x, y - 5, width, sectionHeight)
        .fill()
        .fillColor('#000000'); // Volver a color negro para el texto

    // Título centrado en su sección
    doc.fontSize(7)
        .font('./fonts/Montserrat-Bold.ttf')
        .text(title, x + 5, y, { 
          width: width - 10, // Ancho menos padding
          align: 'left'
        });
  }

  private generateInstitutionData(doc: PDFKit.PDFDocument, data: any) {
    const margin = 30;
    const sectionY = 125;
    const pageWidth = 842;
    const contentWidth = pageWidth - (2 * margin);
    // Calcular la mitad del contenido con espacio entre secciones
    const spaceBetween = 10; // Espacio entre secciones
    const sectionWidth = (contentWidth - spaceBetween) / 2;
    const leftColumnX = margin ;
    const rightColumnX = margin + sectionWidth + spaceBetween;

    // Sección 1 (izquierda)
    this.generateSectionTitle(doc, '1. INFORMACIÓN DE LA INSTITUCIÓN EDUCATIVA', leftColumnX, sectionY, sectionWidth);
    // Sección 2 (derecha)
    this.generateSectionTitle(doc, '2. DATOS DEL DIRECTOR O DIRECTOR ENCARGADO', rightColumnX, sectionY, sectionWidth);

    let y = sectionY + 15;

    // Columna izquierda - Datos de la institución
    doc.fontSize(7)
       .font('./fonts/Lato-Regular.ttf')
       .text('Código SIE:', leftColumnX, y)
       .font('./fonts/Lato-Bold.ttf')
       .text(data.institution?.sieCode || '61710036', leftColumnX + 140, y);

    doc.fontSize(7)
       .font('./fonts/Lato-Regular.ttf')
       .text('Nombre de la Institución Educativa:', leftColumnX, y + 15)
       .font('./fonts/Lato-Bold.ttf')
       .text(data.institution?.name || 'CREVAUX NORTE', leftColumnX + 140, y + 15);

    doc.fontSize(7)
       .font('./fonts/Lato-Regular.ttf')
       .text('Distrito Educativo:', leftColumnX, y + 30)
       .font('./fonts/Lato-Bold.ttf')
       .text(data.institution?.district || 'YACUIBA', leftColumnX + 140, y + 30);

    doc.fontSize(7)
       .font('./fonts/Lato-Regular.ttf')
       .text('Departamento:', leftColumnX, y + 45)
       .font('./fonts/Lato-Bold.ttf')
       .text(data.institution?.department || 'TARIJA', leftColumnX + 140, y + 45);

    // Columna derecha - Datos del director
    doc.fontSize(7)
       .font('./fonts/Lato-Regular.ttf')
       .text('Cédula de Identidad:', rightColumnX, y)
       .font('./fonts/Lato-Bold.ttf')
       .text(data.director?.ci || '7140053', rightColumnX + 140, y);

    doc.fontSize(7)
       .font('./fonts/Lato-Regular.ttf')
       .text('Expedido en:', rightColumnX, y + 15)
       .font('./fonts/Lato-Bold.ttf')
       .text(data.director?.expedido || '', rightColumnX + 140, y + 15);

    doc.fontSize(7)
       .font('./fonts/Lato-Regular.ttf')
       .text('Nombre(s) y Apellido(s):', rightColumnX, y + 30)
       .font('./fonts/Lato-Bold.ttf')
       .text(data.director?.name || 'ALBERTO SANDOVAL SANCHEZ', rightColumnX + 140, y + 30);
  }

  private generateFemaleGradesTable(doc: PDFKit.PDFDocument, data: any) {
      const margin = 30;
      const sectionY = 190;
      const pageWidth = 842;
      const contentWidth = pageWidth - (2 * margin);
      const spaceBetween = 10;
      const sectionWidth = contentWidth;
      const leftColumnX = margin;

      // Sección 1 (izquierda)
      this.generateSectionTitle(doc, '3. REGISTRO DE NOTAS FINALES DE LOS ESTUDIANTES DE GENERO FEMENINO SEGUN ETAPAS DE CALCULO', leftColumnX, sectionY, sectionWidth);
      
      // Encabezados de la tabla
      const headers = [
        'ETAPA', 'PAR.', 'CODIGO RUDE/NOMBRE',
        'ARTES PLÁSTICAS Y VISUALES', 'CIENCIAS NATURALES: BIOLOGÍA - GEOGRAFÍA',
        'CIENCIAS NATURALES: FÍSICA', 'CIENCIAS NATURALES: QUÍMICA', 'CIENCIAS SOCIALES',
        'COMUNICACIÓN Y LENGUAJES: LENGUA CASTELLANA Y ORIGINARIA',
        'COSMOVISIÓNES, FILOSOFÍA Y SICOLOGÍA', 'EDUCACIÓN FÍSICA Y DEPORTES',
        'EDUCACIÓN MUSICAL', 'LENGUA EXTRANJERA', 'MATEMÁTICA',
        'VALORES, ESPIRITUALIDAD Y RELIGIONES', 'Z_TOTAL PROMEDIO'
      ];

      // Coordenadas iniciales de la tabla
      const startX = 38;
      const startY = 210;
      const rowHeight = 37;
      const colWidths = [40, 30, 150, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42];

      // Dibujar encabezados con fondo plomo y bordes
      doc.fontSize(5).font('./fonts/Lato-Bold.ttf');
      let currentX = startX;
      
      // Dibujar celdas de encabezado con fondo plomo
      headers.forEach((header, index) => {
        // Fondo plomo para el header
        doc.fillColor('#e0e0e0')
          .rect(currentX, startY, colWidths[index], rowHeight)
          .fill()
          .fillColor('#000000');
        
        // Borde de la celda
        doc.strokeColor('#000000')
          .lineWidth(0.5)
          .rect(currentX, startY, colWidths[index], rowHeight)
          .stroke();
        
        // Texto del header
        doc.text(header, currentX, startY + 8, {
          width: colWidths[index],
          align: 'center',
          height: rowHeight
        });
        
        currentX += colWidths[index];
      });

      // Datos de estudiantes
      const students = data.students || [
        {
          etapa: 'Etapa 1: Notas 6to Sec.',
          paralelo: 'A',
          code: '6171008520162671-PAREDES SANCHEZ ALVA EMITH',
          name: 'PAREDES SANCHEZ ALVA EMITH',
          notas: [79, 73, 75, 78, 71, 74, 73, 80, 75, 74, 68, 82],
          promedio: 75.17
        },
        {
          etapa: '0',
          paralelo: '',
          code: '6171003620102144-TORREZ ANA ISABEL',
          name: 'TORREZ ANA ISABEL',
          notas: [79, 58, 66, 61, 70, 84, 74, 66, 78, 83, 65, 85],
          promedio: 72.42
        }
      ];

      // Dibujar datos de estudiantes con bordes
      doc.fontSize(5).font('./fonts/Lato-Regular.ttf');
      students.forEach((student: any, rowIndex: number) => {
        const yPos = startY + (rowIndex + 1) * rowHeight;
        currentX = startX;

        // Dibujar fila completa con bordes
        headers.forEach((_, index) => {
          // Borde de la celda
          doc.strokeColor('#000000')
            .lineWidth(0.5)
            .rect(currentX, yPos, colWidths[index], rowHeight)
            .stroke();
          
          currentX += colWidths[index];
        });

        // Volver al inicio de la fila para poner el texto
        currentX = startX;

        // Etapa
        doc.text(student.etapa, currentX + 2, yPos + 8, { 
          width: colWidths[0] - 4, 
          align: 'center' 
        });
        currentX += colWidths[0];

        // Paralelo
        doc.text(student.paralelo, currentX + 2, yPos + 8, { 
          width: colWidths[1] - 4, 
          align: 'center' 
        });
        currentX += colWidths[1];

        // Código RUDE/Nombre
        doc.text(student.code, currentX + 2, yPos + 8, { 
          width: colWidths[2] - 4, 
          align: 'left' 
        });
        currentX += colWidths[2];

        // Notas
        student.notas.forEach((nota: number) => {
          doc.text(nota.toString(), currentX + 2, yPos + 8, { 
            width: 40 - 4, 
            align: 'center' 
          });
          currentX += 42;
        });

        // Promedio
        doc.text(student.promedio.toString(), currentX + 2, yPos + 8, { 
          width: colWidths[15] - 4, 
          align: 'center' 
        });
      });

      // Dibujar borde exterior de toda la tabla
      // doc.strokeColor('#000000')
      //    .lineWidth(1)
      //    .rect(startX, startY, currentX - startX, (students.length + 1) * rowHeight)
      //    .stroke();
  }

  private generateSelectedStudent(doc: PDFKit.PDFDocument, data: any) {
          const margin = 30;
      const sectionY = 335;
      const pageWidth = 842;
      const contentWidth = pageWidth - (2 * margin);
      const spaceBetween = 10;
      const sectionWidth = contentWidth;
      const leftColumnX = margin;

      // Sección 1 (izquierda)
      this.generateSectionTitle(doc, '3. EL ESTUDIANTE DE GENERO FEMENINO SELECCIONADO SEGUN EL PROCESO DE CALCULO, ES:', leftColumnX, sectionY, sectionWidth);

      // Encabezados de la tabla
      const headers = [
        'CODIGO RUDE/NOMBRE',
        'ARTES PLÁSTICAS Y VISUALES', 'CIENCIAS NATURALES: BIOLOGÍA - GEOGRAFÍA',
        'CIENCIAS NATURALES: FÍSICA', 'CIENCIAS NATURALES: QUÍMICA', 'CIENCIAS SOCIALES',
        'COMUNICACIÓN Y LENGUAJES: LENGUA CASTELLANA Y ORIGINARIA',
        'COSMOVISIÓNES, FILOSOFÍA Y SICOLOGÍA', 'EDUCACIÓN FÍSICA Y DEPORTES',
        'EDUCACIÓN MUSICAL', 'LENGUA EXTRANJERA', 'MATEMÁTICA',
        'VALORES, ESPIRITUALIDAD Y RELIGIONES', 'Z_TOTAL PROMEDIO'
      ];

      // Coordenadas iniciales de la tabla
      const startX = 38;
      const startY = 355;
      const rowHeight = 37;
      const colWidths = [150, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47];

      // Dibujar encabezados con fondo plomo y bordes
      doc.fontSize(5).font('./fonts/Lato-Bold.ttf');
      let currentX = startX;
      
      // Dibujar celdas de encabezado con fondo plomo
      headers.forEach((header, index) => {
        // Fondo plomo para el header
        doc.fillColor('#e0e0e0')
          .rect(currentX, startY, colWidths[index], rowHeight)
          .fill()
          .fillColor('#000000');
        
        // Borde de la celda
        doc.strokeColor('#000000')
          .lineWidth(0.5)
          .rect(currentX, startY, colWidths[index], rowHeight)
          .stroke();
        
        // Texto del header
        doc.text(header, currentX, startY + 8, {
          width: colWidths[index],
          align: 'center',
          height: rowHeight
        });
        
        currentX += colWidths[index];
      });

      // Datos de estudiantes
      const students = data.students || [
        {
          // etapa: 'Etapa 1: Notas 6to Sec.',
          // paralelo: 'A',
          code: '6171008520162671-PAREDES SANCHEZ ALVA EMITH',
          name: 'PAREDES SANCHEZ ALVA EMITH',
          notas: [79, 73, 75, 78, 71, 74, 73, 80, 75, 74, 68, 82],
          promedio: 75.17
        },
      ];

      // Dibujar datos de estudiantes con bordes
      doc.fontSize(5).font('./fonts/Lato-Regular.ttf');
      students.forEach((student: any, rowIndex: number) => {
        const yPos = startY + (rowIndex + 1) * rowHeight;
        currentX = startX;

        // Dibujar fila completa con bordes
        headers.forEach((_, index) => {
          // Borde de la celda
          doc.strokeColor('#000000')
            .lineWidth(0.5)
            .rect(currentX, yPos, colWidths[index], rowHeight)
            .stroke();
          
          currentX += colWidths[index];
        });

        // Volver al inicio de la fila para poner el texto
        currentX = startX;

        // Etapa
        // doc.text(student.etapa, currentX + 2, yPos + 8, { 
        //   width: colWidths[0] - 4, 
        //   align: 'center' 
        // });
        // currentX += colWidths[0];

        // Paralelo
        // doc.text(student.paralelo, currentX + 2, yPos + 8, { 
        //   width: colWidths[1] - 4, 
        //   align: 'center' 
        // });
        // currentX += colWidths[1];

        // Código RUDE/Nombre
        doc.text(student.code, currentX + 2, yPos + 8, {
          width: colWidths[0] - 4,
          align: 'left'
        });
        currentX += colWidths[0];

        // Notas
        student.notas.forEach((nota: number) => {
          doc.text(nota.toString(), currentX + 2, yPos + 8, {
            width: 40 - 4,
            align: 'center'
          });
          currentX += 47;
        });

        // Promedio
        doc.text(student.promedio.toString(), currentX + 2, yPos + 8, {
          width: colWidths[15] - 4,
          align: 'center'
        });
      });
  }

  private generateFooter(doc: PDFKit.PDFDocument, data: any) {
    // Firmas en la parte inferior
    const startY = 500;

    doc.fontSize(8)
       .font('./fonts/Lato-Regular.ttf')
       .text('VP Acerca o Acasar de Promedón', 50, startY)
       .text('VPP Directoro o Director de Unidad Educativa', 300, startY)
       .text('VPP Directoro o Director Distrital de Educación', 550, startY);

    // Lugar y fecha en el footer
    doc.text('Lugar TARIJA', 50, startY + 20)
       .text('Fecha/Hora 24 de abr. de 2025 11:35 AM', 50, startY + 32);
  }
}
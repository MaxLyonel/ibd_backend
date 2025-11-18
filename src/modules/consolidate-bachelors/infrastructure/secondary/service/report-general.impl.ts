import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ReportGeneralService } from "src/modules/consolidate-bachelors/domain/ports/outbound/report-general.service";

@Injectable()
export class ReportGeneralServiceImpl implements ReportGeneralService {
  constructor(private readonly httpService: HttpService) {}
  // Regular
  async generateReportGeneralMasculineRegular(gestionId: string, sie: string): Promise<any> {
    // console.log("ingresa aca")
    // const baseUrl = 'http://100.0.101.46:8080/birt-viewer/frameset';

    // const params = {
    //   __report: 'siged/reg_dj_DirectorEstudianteExcelencia_unidadeducativa_regular_v2_afv.rptdesign',
    //   __format: 'pdf',
    //   codue: sie,
    //   gestion: gestionId.toString()
    // };

    // // Construir URL manualmente para verla
    // const queryParams = new URLSearchParams(params);
    // const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    // console.log('URL completa:', fullUrl);

    // const response = await firstValueFrom(
    //   this.httpService.get(baseUrl, {
    //     params: params,
    //     responseType: 'arraybuffer'
    //   })
    // );

    // return Buffer.from(response.data)
    try {
      const baseUrl ='http://100.0.101.46:8080/birt-viewer/frameset';

      const params = {
        __report: 'siged/reg_dj_CalculoAutomaticoEstudianteExcelencia_unidadeducativa_regular_mas_v3_ejea.rptdesign',
        __format: 'pdf',
        codue: sie,
        gestion: gestionId.toString()
      }

    // Construir URL manualmente para verla
    const queryParams = new URLSearchParams(params);
    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    // Decodificar para verla mejor en consola
    const decodedUrl = decodeURIComponent(fullUrl);
    console.log('URL completa:', decodedUrl);

      const response = await firstValueFrom(
        this.httpService.get(baseUrl, {
          params: params,
          responseType: 'arraybuffer'
        })
      );
      return Buffer.from(response.data)

    } catch(error) {
      console.log("error", error)
      throw error
    }
  }

  async generateReportGeneralFeminineRegular(gestionId: string, sie: string): Promise<any> {
    try {
      const baseUrl ='http://100.0.101.46:8080/birt-viewer/frameset';

      const params = {
        __report: 'siged/reg_dj_CalculoAutomaticoEstudianteExcelencia_unidadeducativa_regular_fem_v3_ejea.rptdesign',
        __format: 'pdf',
        codue: sie,
        gestion: gestionId.toString()
      }

    // Construir URL manualmente para verla
    const queryParams = new URLSearchParams(params);
    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    // Decodificar para verla mejor en consola
    const decodedUrl = decodeURIComponent(fullUrl);
    console.log('URL completa:', decodedUrl);

      const response = await firstValueFrom(
        this.httpService.get(baseUrl, {
          params: params,
          responseType: 'arraybuffer'
        })
      );
      return Buffer.from(response.data)

    } catch(error) {
      console.log("error", error)
      throw error
    }
  }

  async generateReportConsolidateRegular(gestionId: string, sie: string): Promise<any> {
    try {
      const baseUrl ='http://100.0.101.46:8080/birt-viewer/frameset';

      const params = {
        __report: 'siged/reg_dj_EstudianteExcelencia_unidadeducativa_regular_v2_afv.rptdesign',
        __format: 'pdf',
        codue: sie,
        gestion: gestionId.toString()
      }

      // Construir URL manualmente para verla
      const queryParams = new URLSearchParams(params);
      const fullUrl = `${baseUrl}?${queryParams.toString()}`;
      // Decodificar para verla mejor en consola
      const decodedUrl = decodeURIComponent(fullUrl);
      console.log('URL completa:', decodedUrl);

      const response = await firstValueFrom(
        this.httpService.get(baseUrl, {
          params: params,
          responseType: 'arraybuffer'
        })
      );

      return Buffer.from(response.data)

    } catch(error) {
      console.log("error", error)
      throw error
    }
  }

  // Alternative
  async generateReportGeneralFeminineAlternative(gestionId: string, sie: string): Promise<any> {
    try {
      const baseUrl ='http://100.0.101.46:8080/birt-viewer/frameset';

      const params = {
        __report: 'siged/reg_dj_CalculoAutomaticoEstudianteExcelencia_unidadeducativa_alter_fem_v3_ejea.rptdesign',
        __format: 'pdf',
        codue: sie,
        gestion: gestionId.toString()
      }

    // Construir URL manualmente para verla
    const queryParams = new URLSearchParams(params);
    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    // Decodificar para verla mejor en consola
    const decodedUrl = decodeURIComponent(fullUrl);
    console.log('URL completa:', decodedUrl);

      const response = await firstValueFrom(
        this.httpService.get(baseUrl, {
          params: params,
          responseType: 'arraybuffer'
        })
      );
      return Buffer.from(response.data)

    } catch(error) {
      console.log("error", error)
      throw error
    }
  }

  async generateReportGeneralMasculineAlternative(gestionId: string, sie: string): Promise<any> {
    try {
      const baseUrl ='http://100.0.101.46:8080/birt-viewer/frameset';

      const params = {
        __report: 'siged/reg_dj_CalculoAutomaticoEstudianteExcelencia_unidadeducativa_alter_mas_v3_ejea.rptdesign',
        __format: 'pdf',
        codue: sie,
        gestion: gestionId.toString()
      }

    // Construir URL manualmente para verla
    const queryParams = new URLSearchParams(params);
    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    // Decodificar para verla mejor en consola
    const decodedUrl = decodeURIComponent(fullUrl);
    console.log('URL completa:', decodedUrl);

      const response = await firstValueFrom(
        this.httpService.get(baseUrl, {
          params: params,
          responseType: 'arraybuffer'
        })
      );
      return Buffer.from(response.data)

    } catch(error) {
      console.log("error", error)
      throw error
    }
  }

  async generateReportConsolidateAlternative(gestionId: string, sie: string): Promise<any> {
    try {
      const baseUrl ='http://100.0.101.46:8080/birt-viewer/frameset';

      const params = {
        __report: 'siged/reg_dj_EstudianteExcelencia_unidadeducativa_alternativa_v3_igg.rptdesign',
        __format: 'pdf',
        codue: sie,
        gestion: gestionId.toString()
      }

    // Construir URL manualmente para verla
    const queryParams = new URLSearchParams(params);
    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    // Decodificar para verla mejor en consola
    const decodedUrl = decodeURIComponent(fullUrl);
    console.log('URL completa:', decodedUrl);

      const response = await firstValueFrom(
        this.httpService.get(baseUrl, {
          params: params,
          responseType: 'arraybuffer'
        })
      );
      return Buffer.from(response.data)

    } catch(error) {
      console.log("error", error)
      throw error
    }
  }
}
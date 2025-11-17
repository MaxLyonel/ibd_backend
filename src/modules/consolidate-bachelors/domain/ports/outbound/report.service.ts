import { Response } from "express";



export abstract class ReportService {
  abstract generateDeclaracionJurada(formData: any, res: Response): any;
}
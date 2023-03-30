import { Controller } from '@nestjs/common';
import { Get, Param, Sse } from '@nestjs/common/decorators';
import { BookingService } from './booking.service';
import { Category, Service } from './interfaces/service/service-structure.interface';

@Controller('booking')
export class BookingController {
  constructor(private s_booking: BookingService) {}
  @Get()
  defaultRoute() {
    return this.getAllCategories();
  }
  @Get(['cat', 'categories'])
  getAllCategories(): { results: Category[] } {
    const allCat = this.s_booking.getAllCategories();
    return { results: allCat };
  }
  @Get(['cat:id', 'category/:id'])
  getCategoryById(@Param('id') id): { results: Category | string } {
    const res = this.s_booking.getCategoryById(`cat${id}`);
    return { results: res };
  }
  @Get(['cat/:sku', 'categories/:sku'])
  getCategoryBySKU(@Param('sku') sku): { results: Category | string } {
    if (sku.length !== 2) return { results: 'Invalid SKU provided' };

    const res = this.s_booking.getCategoryBySKU(sku);
    return { results: res };
  }
  @Get(['svc', 'services'])
  getAllServices(): { results: Service[] } {
    const res = this.s_booking.getAllServices();
    return { results: res };
  }
  @Get('svc:id')
  getServiceById(@Param('id') id): { results: Service | string } {
    const res = this.s_booking.getServiceById(`svc${id}`);
    return { results: res };
  }
  @Get(['svc/cat:id', 'services/cat:id'])
  getServicesByCategory(@Param('id') id): { results: Service[] | string } {
    const res = this.s_booking.getServiceByCat(`cat${id}`);
    return { results: res };
  }
  @Get(['svc/:sku', 'services/:sku'])
  getServicesByCategorySKU(@Param('sku') sku): { results: Service[] | string } {
    let res;
    if (sku.length == 2) res = this.s_booking.getServicesByCatSKU(sku);
    if (sku.length == 3) res = this.s_booking.getServiceBySKU(sku);

    return { results: res };
  }
  @Get(':sku')
  getBySKU(@Param('sku') sku): { results: any } {
    const parsedSKU: any = this.s_booking.parseSKU(sku, true),
      p = parsedSKU.results;
    if (parsedSKU.status === -1) return p;
    let res = {
      category: 'Not provided.',
      style: 'Not provided.',
      size: 'Not provided.',
      length: 'Not provided.',
    };
    if (p.category)
      (res.category as any) = this.getCategoryBySKU(p.category).results;
    if (p.style) (res.style as any) = this.s_booking.getServiceBySKU(p.style);
    if (p.size) {
      (res.size as any) = {
        id: p.size,
        long: this.s_booking.parseSize[p.size] || 'Invalid value provided.',
      };
    }
    if (p.length)
      if (!Number.isNaN(+p.length)) (res.length as any) = p.length + 'in';
      else (res.length as any) = p.length;
    return { results: res };
  }

  // @Sse('ticks')
  // ticks(): Observable<any> {

  //   return this.s_booking;
  // }
}

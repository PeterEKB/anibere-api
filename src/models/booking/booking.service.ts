import { Injectable } from '@nestjs/common';
import {
  Category,
  Service,
  Variant,
} from './interfaces/service/service-structure.interface';

@Injectable()
export class BookingService {
  private fakeCategoryDB: Category[] = [
    {
      id: 'cat1',
      sku: 'bb',
      title: 'box braids',
    },
    {
      id: 'cat2',
      sku: 'cr',
      title: 'crochet',
    },
    {
      id: 'cat3',
      sku: 'fb',
      title: 'french braids',
    },
    {
      id: 'cat4',
      sku: 'si',
      title: 'sew ins',
    },
    {
      id: 'cat5',
      sku: 'ws',
      title: 'wig services',
    },
  ];
  private fakeServiceDB: Service[] = [
    {
      id: 'svc1',
      sku: 'bhn',
      cat_id: 'cat1',
      title: 'bohemian box braids',
      images: [
        'https://i0.wp.com/thefashionassaultnaija.com/wp-content/uploads/2022/08/25-Bohemian-Box-Braids-for-Dazzling-Look-1.jpg?resize=574%2C1024&ssl=1',
      ],
    },
    {
      id: 'svc2',
      sku: 'kls',
      cat_id: 'cat1',
      title: 'knotless box braids',
    },
  ];
  private fakeServiceVariantDB: Variant[] = [
    {
      id: 'var1',
      svc_id: 'svc1',
      type: 'length',
      title: '18in',
      price: 30,
      order: 0,
    },
    {
      id: 'var2',
      svc_id: 'svc1',
      type: 'length',
      title: '20in',
      price: 50,
      order: 1,
    },
    {
      id: 'var3',
      svc_id: 'svc1',
      type: 'length',
      title: '22in',
      price: 70,
      order: 1,
    },
    {
      id: 'var4',
      svc_id: 'svc1',
      type: 'length',
      title: '24in',
      price: 90,
      order: 1,
    },
    {
      id: 'var5',
      svc_id: 'svc1',
      type: 'size',
      title: 'large',
      price: 90,
      order: 0,
    },
  ];

  parseSize = {
    '3s': 'xxxSmall',
    '2s': 'xxSmall',
    xs: 'xSmall',
    sm: 'Small',
    md: 'Medium',
    lg: 'large',
    xl: 'xlarge',
    '2l': 'xxlarge',
    '3l': 'xxxlarge',
  };

  getAllCategories(): Category[] {
    return this.fakeCategoryDB;
  }
  getCategoryById(id: string): Category | string {
    let res =
      this.fakeCategoryDB.find((curr) => curr.id === id) ||
      'No category found with the provided ID.';
    return res;
  }
  getCategoryBySKU(sku): Category | string {
    let res =
      this.fakeCategoryDB.find((curr) => curr.sku === sku) ||
      'No category found with provided SKU.';
    return res;
  }
  getAllServices(): Service[] {
    let res = [];
    this.fakeServiceDB.forEach((curr) => {
      let tmp: Service = { ...curr },
        variants = this.fakeServiceVariantDB.filter(
          (curr2) => curr2.svc_id === curr.id,
        );
      if (variants.length) tmp.variants = variants;
      res.push(tmp);
    });
    return res;
  }
  getServiceById(id): Service | string {
    let xid,
      res = this.fakeServiceDB.find((curr) => {
        if (curr.id === id) {
          xid = curr.id;
          return true;
        }
        return false;
      }),
      variants: Variant[] = this.fakeServiceVariantDB.filter(
        (curr) => curr.svc_id === xid,
      );

    if (variants.length) res.variants = variants;
    return res || 'No service found with provided ID.';
  }
  getServiceBySKU(sku): Service | string {
    let id,
      res = this.fakeServiceDB.find((curr) => {
        if (curr.sku === sku) {
          id = curr.id;
          return true;
        }
        return false;
      }),
      variants: Variant[] = this.fakeServiceVariantDB.filter(
        (curr) => curr.svc_id === id,
      );

    if (variants.length) res.variants = variants;
    return res || 'No services found with provided SKU.';
  }
  getServiceByCat(id): Service[] | string {
    let res: Service[] | string = [];
    this.fakeServiceDB.forEach((curr) => {
      if (curr.cat_id === id) (res as Service[]).push(curr);
    });
    if (res.length < 1) {
      res = 'No services found.';
    }
    if (typeof res !== 'string')
      res.forEach((curr, index) => {
        let replace: Service = this.getServiceById(curr.id) as Service;
        (res[index] as Service) = replace;
      });
    return res;
  }
  getServicesByCatSKU(sku): Service[] | string {
    let res: Service[] | string = [],
      catID;
    this.fakeCategoryDB.find((curr) => {
      if (curr.sku === sku) catID = curr.id;
    });
    if (!catID) return 'No category found with provided SKU.';

    this.fakeServiceDB.forEach((curr) => {
      if (curr.cat_id === catID) (res as Service[]).push(curr);
    });
    if (res.length < 1) {
      res = 'No services found.';
    }
    if (typeof res !== 'string')
      res.forEach((curr, index) => {
        let replace: Service = this.getServiceById(curr.id) as Service;
        (res[index] as Service) = replace;
      });
    return res;
  }
  parseSKU(sku: string, bool?: boolean) {
    const length = sku.length,
      parsedSKU = bool
        ? {
            status: 0,
            results: {
              category: false,
              style: false,
              size: false,
              length: false,
            },
          }
        : {
            status: 0,
            results: {
              category: 'Not provided.',
              style: 'Not provided.',
              size: 'Not provided.',
              length: 'Not provided.',
            },
          };

    if (length == 2 || length == 5 || length == 7 || length == 9) {
      parsedSKU.status = 1;
      parsedSKU.results.category = sku.slice(0, 2);

      if (length > 2) {
        parsedSKU.results.style = sku.slice(2, 5);
        if (length > 5) {
          let tmp = sku.slice(5, 7);
          if (Number.isNaN(+tmp)) parsedSKU.results.size = tmp;
          else parsedSKU.results.size = `An incorrect value provided.`;
          if (length > 7) {
            tmp = sku.slice(-2);
            if (!Number.isNaN(+tmp)) parsedSKU.results.length = sku.slice(-2);
            else parsedSKU.results.length = `An incorrect value provided.`;
          }
        }
      }
    } else {
      return { status: -1, results: 'Invalid SKU provided;' };
    }

    return parsedSKU;
  }
}

/*
x bbmd24001
x bb001md24
bb|bhn|md|24
wg|bsb|sm|25
*/

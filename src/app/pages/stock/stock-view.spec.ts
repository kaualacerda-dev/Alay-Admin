import { of } from 'rxjs';
import { StockViewComponent } from './stock-view';

const product = {
  id: 1,
  name: 'Calca Streetwear',
  sku: 'cal-prt',
  stock: 100,
  price: 160,
  description: 'Calca Streetwear Preta',
  imageUrl: 'https://example.com/product.png',
};

describe('StockViewComponent', () => {
  it('loads products when the API returns a direct product list', () => {
    const productService = {
      getProducts: vi.fn().mockReturnValue(of([product])),
      searchProduct: vi.fn(),
    };
    const component = new StockViewComponent(
      productService as never,
      { detectChanges: vi.fn() } as never,
    );

    component.ngOnInit();

    expect(component.products).toEqual([product]);
    expect(component.totalProducts).toBe(1);
    expect(component.error).toBeNull();
  });
});

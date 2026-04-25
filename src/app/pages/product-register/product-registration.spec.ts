import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { ProductRegistrationComponent } from './product-registration';

describe('ProductRegistrationComponent', () => {
  it('resets the form and keeps the success message after creating a product', () => {
    const productService = {
      createProducts: vi.fn().mockReturnValue(
        of({
          product: {
            id: 1,
            name: 'Calca Streetwear',
            sku: 'cal-prt',
            stock: 100,
            price: 160,
            description: 'Calca Streetwear Preta',
            imageUrl: 'https://example.com/product.png',
          },
        }),
      ),
    };

    const component = new ProductRegistrationComponent(
      productService as never,
      { detectChanges: vi.fn() } as never,
    );
    const form = {
      resetForm: vi.fn(),
    } as unknown as NgForm;
    const imageInput = document.createElement('input');
    imageInput.type = 'file';

    component.name = 'Calca Streetwear';
    component.sku = 'cal-prt';
    component.category = 'Calcas';
    component.stock = 100;
    component.price = 160;
    component.description = 'Calca Streetwear Preta';
    component.selectedImage = new File(['image'], 'product.png', {
      type: 'image/png',
    });

    component.saveProduct(form, imageInput);

    expect(form.resetForm).toHaveBeenCalledWith({
      name: '',
      sku: '',
      category: '',
      stock: null,
      price: null,
      description: '',
    });
    expect(component.selectedImage).toBeNull();
    expect(component.imageName).toBe('');
    expect(component.imagePreviewUrl).toBe('');
    expect(component.message).toBe('Produto criado com sucesso.');
    expect(component.messageType).toBe('success');
  });
});

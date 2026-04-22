import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './product-registration.html',
})
export class ProductRegistrationComponent implements OnDestroy {
  readonly categories = ['Camisetas', 'Bermudas', 'Calças', 'Moletons'];

  name = '';
  sku = '';
  category = '';
  stock: number | null = null;
  price: number | null = null;
  description = '';
  imagePreviewUrl = '';
  imageName = '';
  selectedImage: File | null = null;

  loading = false;
  message = '';
  messageType = '';
  private redirectTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  saveProduct() {
    this.message = '';
    this.messageType = '';

    if (!this.selectedImage) {
      this.message = 'Adicione uma imagem do produto antes de salvar.';
      this.messageType = 'error';
      return;
    }

    if (!this.category) {
      this.message = 'Selecione uma categoria antes de salvar.';
      this.messageType = 'error';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name.trim());
    formData.append('sku', this.sku.trim());
    formData.append('category', this.category);
    formData.append('stock', String(Number(this.stock)));
    formData.append('price', String(Number(this.price)));
    formData.append('description', this.description.trim());
    formData.append('image', this.selectedImage);

    this.loading = true;

    this.productService
      .createProducts(formData)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.clearFields();
          this.message = 'Produto criado com sucesso.';
          this.messageType = 'success';
          this.redirectTimeoutId = setTimeout(() => {
            void this.router.navigate(['/home']);
          }, 2500);
        },
        error: (error) => {
          this.message =
            error?.error?.message || 'Nao foi possivel criar o produto.';
          this.messageType = 'error';
        },
      });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.removeImage(input);
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.message = 'Selecione um arquivo de imagem valido.';
      this.messageType = 'error';
      this.removeImage(input);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.message = 'A imagem deve ter no maximo 5 MB.';
      this.messageType = 'error';
      this.removeImage(input);
      return;
    }

    this.revokeImagePreview();
    this.selectedImage = file;
    this.imagePreviewUrl = URL.createObjectURL(file);
    this.imageName = file.name;
    this.message = '';
    this.messageType = '';
  }

  removeImage(input?: HTMLInputElement) {
    this.revokeImagePreview();
    this.selectedImage = null;
    this.imageName = '';

    if (input) {
      input.value = '';
    }
  }

  clearFields() {
    this.name = '';
    this.sku = '';
    this.category = '';
    this.stock = null;
    this.price = null;
    this.description = '';
    this.removeImage();
  }

  ngOnDestroy() {
    this.revokeImagePreview();

    if (this.redirectTimeoutId) {
      clearTimeout(this.redirectTimeoutId);
    }
  }

  private revokeImagePreview() {
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
      this.imagePreviewUrl = '';
    }
  }
}

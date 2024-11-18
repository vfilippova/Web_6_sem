import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/createProduct.dto';
import { CreateEntityProduct } from './product.entities';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create new product' })
  @ApiOkResponse({ status: 201, description: 'Successfully created' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.create(createProductDto);
      return { status: 'success', data: product };
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  @ApiOperation({ summary: 'Update product by id' })
  @ApiOkResponse({ status: 200, description: 'Product updated successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Incorrect request arguments',
  })
  @ApiNotFoundResponse({ description: 'Nonexistent product' })
  @Put(':productId')
  async updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        productId,
        updateProductDto,
      );
      return { status: 'success', data: updatedProduct };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Product not found');
      }
      throw new BadRequestException('Invalid data');
    }
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({
    status: 200,
    description: 'Successfully got',
    type: CreateEntityProduct,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Nonexistent product' })
  @Get(':productId')
  async getProductById(@Param('productId', ParseIntPipe) productId: number) {
    try {
      const product = await this.productService.getProductById(productId);
      return { status: 'success', data: product };
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    description: 'All products have been found',
    type: [CreateEntityProduct],
  })
  @ApiNotFoundResponse({ description: 'No product in the system' })
  @Get()
  async findAll() {
    const products = await this.productService.findAllProducts();
    return { status: 'success', data: products };
  }

  @ApiOperation({ summary: 'Delete product by id' })
  @ApiOkResponse({ status: 200, description: 'Successfully deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Delete(':productId')
  async deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    try {
      await this.productService.deleteProduct(productId);
      return { status: 'success', message: 'Product successfully deleted' };
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
}

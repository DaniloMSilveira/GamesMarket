import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Publisher } from '../models/publisher';
import { PublisherService } from '../services/publisher.service';
import { CepSearch } from '../models/address';
import { StringUtils } from 'src/app/utils/string-utils';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  publisherForm: FormGroup;
  publisher: Publisher = new Publisher();

  textoDocumento: string = 'CPF (requerido)';
  formResult: string = '';
  
  constructor(private fb: FormBuilder,
    private publisherService: PublisherService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit() {

    this.publisherForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      ativo: ['', [Validators.required]],
      tipoPublisher: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });

    this.publisherForm.patchValue({ tipoPublisher: '1', ativo: true });
  }

  ngAfterViewInit(): void {

    this.tipoPublisherForm().valueChanges
      .subscribe(() => {
        this.trocarValidacaoDocumento();
        super.configurarValidacaoFormularioBase(this.formInputElements, this.publisherForm)
        super.validarFormulario(this.publisherForm);
      });

      super.configurarValidacaoFormularioBase(this.formInputElements, this.publisherForm)
  }
    
  trocarValidacaoDocumento() {
    if (this.tipoPublisherForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
      this.textoDocumento = "CPF (requerido)";
    }
    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
      this.textoDocumento = "CNPJ (requerido)";
    }
  }

  tipoPublisherForm(): AbstractControl {
    return this.publisherForm.get('tipoPublisher');
  }

  documento(): AbstractControl {
    return this.publisherForm.get('documento');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.publisherService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepSearch: CepSearch) {

    this.publisherForm.patchValue({
      endereco: {
        logradouro: cepSearch.logradouro,
        bairro: cepSearch.bairro,
        cep: cepSearch.cep,
        cidade: cepSearch.localidade,
        estado: cepSearch.uf
      }
    });
  }

  adicionarPublisher() {
    if (this.publisherForm.dirty && this.publisherForm.valid) {

      this.publisher = Object.assign({}, this.publisher, this.publisherForm.value);
      this.formResult = JSON.stringify(this.publisher);

      this.publisher.endereco.cep = StringUtils.somenteNumeros(this.publisher.endereco.cep);
      this.publisher.documento = StringUtils.somenteNumeros(this.publisher.documento);
      // forçando o tipo publisher ser serializado como INT
      this.publisher.tipoPublisher = parseInt(this.publisher.tipoPublisher.toString());

      this.publisherService.novoPublisher(this.publisher)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.publisherForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Publisher cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/publisheres/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { StringUtils } from 'src/app/utils/string-utils';
import { Publisher } from '../models/publisher';
import { Address, CepSearch } from '../models/address';
import { PublisherService } from '../services/publisher.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  publisherForm: FormGroup;
  enderecoForm: FormGroup;

  publisher: Publisher = new Publisher();
  endereco: Address = new Address();

  textoDocumento: string = '';
  tipoPublisher: number;

  constructor(private fb: FormBuilder,
    private publisherService: PublisherService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) {

    super();

    config.backdrop = 'static';
    config.keyboard = false;

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
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);

    this.publisher = this.route.snapshot.data['publisher'];
    this.tipoPublisher = this.publisher.tipoPublisher;
  }

  ngOnInit() {

    this.spinner.show();

    this.publisherForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: '',
      ativo: ['', [Validators.required]],
      tipoPublisher: ['', [Validators.required]]
    });

    this.enderecoForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      publisherId: ''
    });

    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  preencherForm() {

    this.publisherForm.patchValue({
      id: this.publisher.id,
      nome: this.publisher.nome,
      ativo: this.publisher.ativo,
      tipoPublisher: this.publisher.tipoPublisher.toString(),
      documento: this.publisher.documento
    });

    if (this.tipoPublisherForm().value === "1") {
      this.documento().setValidators([Validators.required]);
    }
    else {
      this.documento().setValidators([Validators.required]);
    }

    this.enderecoForm.patchValue({
      id: this.publisher.endereco.id,
      logradouro: this.publisher.endereco.logradouro,
      numero: this.publisher.endereco.numero,
      complemento: this.publisher.endereco.complemento,
      bairro: this.publisher.endereco.bairro,
      cep: this.publisher.endereco.cep,
      cidade: this.publisher.endereco.cidade,
      estado: this.publisher.endereco.estado
    });
  }

  ngAfterViewInit() {
    this.tipoPublisherForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      super.configurarValidacaoFormularioBase(this.formInputElements, this.publisherForm)
      super.validarFormulario(this.publisherForm)
    });

    super.configurarValidacaoFormularioBase(this.formInputElements, this.publisherForm);
  }

  trocarValidacaoDocumento() {

    if (this.tipoPublisherForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
    }

    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
    }
  }

  documento(): AbstractControl {
    return this.publisherForm.get('documento');
  }

  tipoPublisherForm(): AbstractControl {
    return this.publisherForm.get('tipoPublisher');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.publisherService.consultarCep(cep)
      .subscribe({
        next: cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        error: erro => this.errors.push(erro)
      });
  }

  preencherEnderecoConsulta(cepSearch: CepSearch) {

    this.enderecoForm.patchValue({
      logradouro: cepSearch.logradouro,
      bairro: cepSearch.bairro,
      cep: cepSearch.cep,
      cidade: cepSearch.localidade,
      estado: cepSearch.uf
    });
  }

  editarPublisher() {
    if (this.publisherForm.dirty && this.publisherForm.valid) {

      this.publisher = Object.assign({}, this.publisher, this.publisherForm.value);
      this.publisher.documento = StringUtils.somenteNumeros(this.publisher.documento);

      /* Workaround para evitar cast de string para int no back-end */
      this.publisher.tipoPublisher = parseInt(this.publisher.tipoPublisher.toString());

      this.publisherService.atualizarPublisher(this.publisher)
        .subscribe({
         next: sucesso => { this.processarSucesso(sucesso) },
         error: falha => { this.processarFalha(falha) }
        });
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Publisher atualizado com sucesso!', 'Sucesso!');
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

  editarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {

      this.endereco = Object.assign({}, this.endereco, this.enderecoForm.value);

      this.endereco.cep = StringUtils.somenteNumeros(this.endereco.cep);
      this.endereco.publisherId = this.publisher.id;

      this.publisherService.atualizarEndereco(this.endereco)
        .subscribe({
         next: () => this.processarSucessoEndereco(this.endereco),
         error: falha => { this.processarFalhaEndereco(falha) }
        });
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.publisher.endereco = endereco
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content) {
    this.modalService.open(content);
  }
}

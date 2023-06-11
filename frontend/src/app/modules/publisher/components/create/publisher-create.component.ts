import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { utilsBr } from 'js-brasil';

import { CEPJValidator, CNPJValidator, CPFValidator } from 'src/app/shared/validators/brazil';
import { StringUtils } from 'src/app/shared/utils/string-utils';

import { PublisherService } from '../../services/publisher.service';

import { CepDetails, EstadosList } from '../../models/address';


import { GenericValidatorComponent } from 'src/app/shared/components/generic-validator.component';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss']
})
export class PublisherCreateComponent extends GenericValidatorComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private formbuilder: FormBuilder,
    private publisherService: PublisherService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    super();

    this.validationMessages = {
      name: {
        required: 'The field is required'
      }
    };
  }

  form: FormGroup
  errors: string[] = [];

  // 99999-999
  cepMask = { mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/] }
  estados = EstadosList;

  textDocument: string = 'CPF';
  documentMask = { mask: utilsBr.MASKS.cpf.textMask }

  mudancasNaoSalvas: boolean = false;

  ngOnInit() {

    this.spinner.show();

    this.form = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.required]],
      typePerson: ['PF', [Validators.required]],
      foundationDate: ['', [Validators.required]],

      address: this.formbuilder.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required, CEPJValidator()]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });

    this.spinner.hide();
  }

  ngAfterViewInit(): void {
    this.changeDocumentValidation();
    this.typePersonForm().valueChanges
      .subscribe(() => {
        this.changeDocumentValidation();
      });
  }
    
  changeDocumentValidation() {
    if (this.typePersonForm().value === "PF") {
      this.documentForm().clearValidators();
      this.documentForm().setValidators([Validators.required, CPFValidator()]);
      this.textDocument = "CPF";
      this.documentMask = { mask: utilsBr.MASKS.cpf.textMask }
    }
    else {
      this.documentForm().clearValidators();
      this.documentForm().setValidators([Validators.required, CNPJValidator()]);
      this.textDocument = "CNPJ";
      this.documentMask = { mask: utilsBr.MASKS.cnpj.textMask }
    }
    
    this.form.patchValue({ document: '' });
  }

  typePersonForm(): AbstractControl {
    return this.form.get('typePerson');
  }

  documentForm(): AbstractControl {
    return this.form.get('document');
  }

  createPublisher() {
    console.log('values:', this.form.value)
  }

  searchCep() {
    let cep = this.form.value.address.cep;
    cep = StringUtils.onlyNumbers(cep);
    if (cep.length < 8) return;

    this.spinner.show();
    this.publisherService.consultarCep(cep)
      .subscribe({
        next: (result: CepDetails) => {
          this.fillAddress(result);
        },
        error: (e) => {
          this.toastr.error(
            'Error searching by CEP. Please fill in the address fields', 
            'Error CEP',
          );
        },
      })
      .add(() => this.spinner.hide());
  }

  fillAddress(cepDetails: CepDetails) {
    if (cepDetails && cepDetails.erro) {
      this.toastr.warning(
        'CEP not found', 
        'CEP not found',
      );
    }

    this.form.patchValue({
      address: {
        logradouro: cepDetails.logradouro,
        bairro: cepDetails.bairro,
        cidade: cepDetails.localidade,
        estado: cepDetails.uf
      }
    });
  }
}
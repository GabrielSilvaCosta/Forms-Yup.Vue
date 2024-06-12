<template>
    <form
      class="form max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded"
      @submit.prevent="submitForm"
    >
      <div class="form-group">
        <label for="name" class="text-lg font-semibold">Nome:</label>
        <input
          type="text"
          v-model="form.name"
          class="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <span v-if="errors.name" class="error text-sm">{{ errors.name[0] }}</span>
      </div>
      <div class="form-group mt-6">
        <label for="email" class="text-lg font-semibold">Email:</label>
        <input
          type="email"
          v-model="form.email"
          class="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <span v-if="errors.email" class="error text-sm">{{ errors.email[0] }}</span>
      </div>
  
      <div class="mt-6 form-group flex items-center">
        <input
          type="checkbox"
          id="checkboxOne"
          v-model="checkboxOne"
          class="w-6 h-6 p-1 border border-gray-400 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <label for="checkboxOne" class="ml-2 text-lg font-semibold">Aceitar Termos</label>
      </div>
  
      <div class="mt-6">
        <button
          type="submit"
          class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import formSchema from '../schemas/formSchema';
  import * as yup from 'yup'; 
  
  export default {
    setup() {
      const checkboxOne = ref(true);
  
      return {
        checkboxOne,
      };
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
        },
        errors: {},
      };
    },
    methods: {
      async submitForm() {
        try {
          await formSchema.validate(this.form, { abortEarly: false });
          alert('Formulário enviado com sucesso!');
        } catch (err) {
          if (err instanceof yup.ValidationError) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.errors;
            });
            this.errors = validationErrors;
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  
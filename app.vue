<template>
  <div>
    <ClientOnly>
      <Vueform ref="form$" >
        <TextElement name="numbers"
                     label="Список чисел"
                     rules="regex:([0-9]+),?" />
        <ButtonElement name="submit"
                       :submits="true"
                       button-label="Сортировать на сервере"
                       :full="true"
                       size="lg"
                       @click="onSubmit" />
      </Vueform>
    </ClientOnly>


    <h3 class="mt-5 border-bottom">Отсортированный массив: ответ с сервера</h3>
    <div>
      <span v-for="num in sorted"
            :key="num"
            class="badge text-bg-secondary">{{ num }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// DATA
const form$ = ref(null)
const sorted = ref([])

// METHODS
const sortRequest = async (numbers) => {
  const { data } = await $fetch('/api/numbers/sort', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(numbers)
  })

  sorted.value = data
}

// EVENTS
const onSubmit = () => {
  sortRequest(form$.value.data.numbers)
}
</script>
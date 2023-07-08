<template>
  <div
    class="card card-compact w-full max-h-32 bg-base-100 shadow-xl card-bordered"
    :class="`hover:bg-${category.attributes.Abbreviation} border-${category.attributes.Abbreviation}`"
  >
    <div class="card-body">
      <NuxtLink :to="localePath('/courses/' + props.courseId)">
        <h4 class="card-title">
          {{
            locale === 'ar' ?
              props.nameAr
              : props.name
          }}
        </h4>
        <p>
          {{
            locale === 'ar' ?
              props.category.attributes.ArabicName
              : props.category.attributes.Name
          }}
        </p>
        <p>{{ props.courseId }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  nameAr: {
    type: String,
    required: true
  },
  category: {
    type: Object,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  examsCount: {
    type: Number,
    required: false,
    default: 0
  },
  notesCount: {
    type: Number,
    required: false,
    default: 0
  },
  favorite: {
    type: Boolean,
    required: false,
    default: false
  },
  listView: {
    type: Boolean,
    required: false,
    default: false
  }
})
const { locale } = useI18n();
</script>
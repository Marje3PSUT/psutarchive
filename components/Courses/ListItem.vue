<template>
  <div class="card-body">
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
    type: String,
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
  // if true,  courses will be shown in list view
  // if false, courses will be shown in grid view
  listView: {
    type: Boolean,
    required: false,
    default: false
  }
})
const { locale } = useI18n();
</script>
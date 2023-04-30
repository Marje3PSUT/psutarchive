<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <!-- Navigation menu on small screens -->
      <div class="dropdown">
        <label
          tabindex="0"
          class="btn btn-ghost md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-60 border"
        >
          <li tabindex="0">
            <NuxtLink to="/courses">
              {{
                $t('courses')
              }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/upload">
              {{
                $t('submit')
              }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">
              {{
                $t('about')
              }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink
        to="/"
        class="btn btn-ghost normal-case text-xl"
      >
        PSUT Archive
      </NuxtLink>
    </div>
    <!-- Navigation menu on md/lg screens -->
    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal px-1">
        <li tabindex="0">
          <NuxtLink to="/courses">
            {{
              $t('courses')
            }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/upload">
            {{
              $t('submit')
            }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">
            {{
              $t('about')
            }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <form>
        <select v-model="locale" class="select">
          <option value="en">
            English
          </option>
          <option value="ar">
            Arabic
          </option>
        </select>
      </form>
      <!-- Theme toggle -->
      <label class="swap swap-rotate">
        <input
          type="checkbox"
          class="mx-4"
          @change="toggleTheme"
        >
        <svg
          class="swap-on"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4c.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7c0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26a5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
          />
        </svg>
        <svg
          class="swap-off"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
          />
        </svg>
      </label>
    </div>
  </div>
</template>
<script setup>
const toggleTheme = () => {
  useTheme().value = useTheme().value == "light" ? "dark" : "light";
};
const {locale} = useI18n();
</script>

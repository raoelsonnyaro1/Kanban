
<template>
  <v-container>
        <!-- Navbar Section -->
        <v-app-bar app color="primary" dark>
      <v-app-bar-title>
        <span>Your Agency</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn color="blue" href="/login">Login to CRM</v-btn>
    </v-app-bar>

        <!-- Logo Section -->
        <v-row class="justify-center mt-16">
      <v-col cols="6" rows="6" class="text-center mt-4">
        <v-img src="@/assets/logo.svg" alt="Agency Logo" height="100"></v-img>
      </v-col>
    </v-row>

    <!-- Hero Section -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="display-2">Your Agency Name</h1>
        <p class="subtitle-1">Providing Creative Solutions</p>
        <v-btn color="primary" large>Contact Us</v-btn>
      </v-col>
    </v-row>

    <!-- Services Section -->
    <v-row class="mt-16">
      <v-col cols="12" sm="6" md="4" v-for="service in services" :key="service.id">
        <v-card>
          <v-img :src="service.image" :alt="service.title" height="200"></v-img>
          <v-card-title>{{ service.title }}</v-card-title>
          <v-card-text>{{ service.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- About Section -->
    <v-row id="about" class="mt-16">
      <v-col cols="12" md="6" class="text-center">
        <h2 class="display-3">About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </v-col>
      <v-col cols="12" md="6">
        <v-img src="@/assets/about.jpeg" alt="About Us Image" height="300"></v-img>
      </v-col>
    </v-row>

    <!-- Contact Section -->
    <!-- Contact Section -->
    <v-row id="contact" class="mt-16">
      <v-col cols="12" class="text-center">
        <h2 class="display-3">Contact Us</h2>
        <p>Reach out to us for any inquiries or collaborations.</p>

        <!-- Contact Form -->
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.name" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.email" label="Email" required></v-text-field>
            </v-col>
          </v-row>

          <v-textarea v-model="formData.message" label="Message" required></v-textarea>

          <v-btn type="submit" class="blue-button" large>Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>

     <!-- Footer Section -->
     <v-row>
      <v-col cols="12" class="text-center mt-4">
        <v-footer app>
          <v-col>
            <v-row>
              <v-col>
                <v-btn icon href="#" target="_blank">
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn icon href="#" target="_blank">
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn icon href="#" target="_blank">
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>&copy; 2023 Your Agency. All rights reserved.</p>
              </v-col>
            </v-row>
          </v-col>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      services: [
        { id: 1, title: 'Web Design', description: 'Beautiful and responsive websites', image: require('@/assets/web-design.jpeg') },
        { id: 2, title: 'Graphic Design', description: 'Eye-catching graphics for your brand', image: require('@/assets/graphic-design.jpeg') },
        { id: 3, title: 'Digital Marketing', description: 'Strategies to boost your online presence', image: require('@/assets/digital-marketing.webp') },
      ],

      formData: {
        name: '',
        email: '',
        message: '',
      },
    };
  },

  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log('Form submitted:', this.formData);
      // You can add your form submission logic, such as sending data to a server.
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>

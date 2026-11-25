import 'package:flutter/material.dart';
import 'package:flutter_final_project/screens/blog_view.dart';
import 'package:flutter_final_project/screens/forgot_password.dart';

import 'package:flutter_final_project/screens/home_screen.dart';
import 'package:flutter_final_project/screens/login_screen.dart';
import 'package:flutter_final_project/screens/new_password.dart';
import 'package:flutter_final_project/screens/signup_screen.dart';
import 'package:flutter_final_project/screens/verify_otp.dart';
import 'package:flutter_final_project/widgets/uploadBlog.dart';

Map<String, Widget Function(BuildContext)> get appRoutes => {
      '/home': (context) => Home(
            initialBreadCrumbs: [],
            bottomNavigationIndex: 0,
          ),
      '/login': (context) => Login(),
      "/signup": (context) => SignUp(),
      "/forgot-password": (context) => ForgotPassword(),
      "/new-password": (context) => NewPassword(),
      "/verify-otp": (context) => VerifyOtp(),
      "/upload-blog": (context) => UploadBlog(),
      "/blog-view": (context) => BlogView(),
    };

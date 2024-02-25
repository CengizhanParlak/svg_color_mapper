import 'package:flutter/material.dart';
import 'package:svg_color_mapper/my_widget.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Material App Bar'),
        ),
        body: const Center(
          child: Column(
            children: [
              MyWidget(),
            ],
          ),
        ),
      ),
    );
  }
}

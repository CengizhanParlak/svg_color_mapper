import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:svg_color_mapper/custom_color_mapper.dart';

class MyWidget extends StatelessWidget {
  const MyWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      height: 100,
      width: 100,
      child: SvgPicture(
        SvgAssetLoader(
          'assets/svg/file.svg',
          colorMapper: _HeartArrowColorMapper(
            [
              SvgColorModel(
                designColor: Color(0xFFE7CA62),
                changeColor: Colors.blue,
              ),
              SvgColorModel(
                attributeName: 'stroke',
                changeColor: Colors.purple,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HeartArrowColorMapper extends CustomColorMapper {
  const _HeartArrowColorMapper(super.svgColorModel);
}

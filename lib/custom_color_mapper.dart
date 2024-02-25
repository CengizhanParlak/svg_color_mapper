import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class CustomColorMapper extends ColorMapper {
  final List<SvgColorModel> svgColorModel;

  const CustomColorMapper(this.svgColorModel);

  @override
  Color substitute(
    String? id,
    String elementName,
    String attributeName,
    Color color,
  ) {
    final svgColor = svgColorModel.firstWhere(
      (element) {
        return element.isMatches(id, elementName, attributeName, color);
      },
      orElse: () {
        return SvgColorModel(designColor: color);
      },
    );
    return svgColor.color;
  }
}

class SvgColorModel {
  final String? id;
  final String? elementName;
  final String? attributeName;
  final Color? designColor;
  final Color? changeColor;

  const SvgColorModel({
    this.id,
    this.elementName,
    this.attributeName,
    this.designColor,
    this.changeColor,
  });

  Color get color => changeColor ?? designColor ?? Colors.black;

  bool isMatches(
    String? id,
    String elementName,
    String attributeName,
    Color designColor,
  ) {
    if (this.id != null && this.id == id) {
      return true;
    }
    bool isElementExists = this.elementName != null;
    bool isAttributeExists = this.attributeName != null;
    bool isDesignColorExists = this.designColor != null;
    if (isElementExists && isAttributeExists) {
      return this.elementName == elementName &&
          this.attributeName == attributeName &&
          this.designColor == designColor;
    } else if (isElementExists) {
      return this.elementName == elementName && this.designColor == designColor;
    } else if (isAttributeExists) {
      return this.attributeName == attributeName &&
          this.designColor == designColor;
    } else if (isDesignColorExists) {
      return this.designColor == designColor;
    }
    return false;
  }
}

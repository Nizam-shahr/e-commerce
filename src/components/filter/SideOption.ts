import { categoryTypes } from "@/types";
import BreakFast from "../Icon/BreakFast";
import Cooking from "../Icon/Cooking";
import Dairy from "../Icon/Dairy";
import Fruit from "../Icon/Friut";
import Health from "../Icon/Health";
import Home from "../Icon/Home";
import Meat from "../Icon/Meat";
import Pet from "../Icon/Pet";
import Snack from "../Icon/Snack";
import Friut from "../Icon/Friut";
import Beverage from '../Icon/Beverage'

export const categories: categoryTypes[] = [
  {
    category: "Fruits & Vegetables",
    Icon: Fruit,
  },
  {
    category: "Meat & Fish",
    Icon: Meat,
  },
  {
    category: "Snack",
    Icon: Snack,
  },
  {
    category: "PetCare",
    Icon: Pet,
  },
  {
    category: "Home & Cleaning",
    Icon: Home,
  },
  {
    category: "Dairy",
    Icon: Dairy,
  },
  {
    category: "Cooking",
    Icon: Cooking,
  },
  {
    category: "BreakFast",
    Icon: BreakFast,
  },
  {
  	category: 'Beverage',
  	Icon: Beverage,

  },
  {
    category: "Beauty & Health",
    Icon: Health,
  },
];

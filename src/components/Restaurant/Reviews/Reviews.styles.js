import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 15,
  },
  review: {
    paddingVertical: 20,
  },

  title: {
    fontWeight: "bold",
  },

  subtitle: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },

  comment: {
    paddingRight: 50,
  },
  contentRating: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 1,
  },

  starContainer: {
    height: 5,
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },

  date: {
    fontSize: 12,
    color: "#828282",
  },
});

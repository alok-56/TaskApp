import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const Taskcard = ({ data, deletefun, editfun }) => {
  const [swap, setSwap] = useState(150);
  const onDelete = (id) => {
    deletefun(id);
  };

  const onEdit = (id, item) => {
    editfun(id, item);
  };

  const ConvertIntoDay = (date) => {
    const dateObj = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "short",
    }).format(dateObj);
    return formattedDate;
  };

  return (
    <SwipeListView
      data={data}
      renderItem={({ item }) => (
        <View style={styles.taskCardContainer}>
          <View style={styles.taskCardDate}>
            <Text style={styles.taskCardDateText}>
              {ConvertIntoDay(item.createdAt)}
            </Text>
          </View>
          <View style={styles.taskCardContent}>
            <Text style={styles.taskCardTitle}>{item.Title}</Text>
            <Text style={styles.taskCardDescription}>{item.Description}</Text>
          </View>
        </View>
      )}
      renderHiddenItem={({ item }) => (
        <View
          style={{
            height: 70,
            width: "95%",
            borderRadius: 8,
            alignSelf: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={[styles.deleteButton, styles.button]}
            onPress={() => onDelete(item._id)}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.editButton, styles.button]}
            onPress={() => onEdit(item._id, item)}
            activeOpacity={0.7}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={swap}
      disableRightSwipe={false}
      disableLeftSwipe={false}
      friction={5}
      tension={40}
    />
  );
};

export default Taskcard;

const styles = StyleSheet.create({
  taskCardContainer: {
    width: "90%",
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  taskCardDate: {
    height: "100%",
    width: "20%",
    backgroundColor: "#4E8AFD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  taskCardDateText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  taskCardContent: {
    height: "100%",
    width: "75%",
    marginLeft: 15,
    justifyContent: "center",
  },
  taskCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  taskCardDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "gray",
  },
  hiddenItem: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    paddingRight: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  editButton: {
    backgroundColor: "#4E8AFD",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

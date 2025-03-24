import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import CustomButton from "./CustomButton";

const CustomModal = ({ isvisible, close, children }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      isVisible={isvisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onBackdropPress={toggleModal}
      onBackPressed={toggleModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={close}
          style={{ position: "absolute", right: 15, top: 10 }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: "#fff",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
              X
            </Text>
          </View>
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgb(214, 214, 210)",
    borderRadius: 10,
    width: 300,
    elevation: 10,
    padding: 20,
},
});

export default CustomModal;

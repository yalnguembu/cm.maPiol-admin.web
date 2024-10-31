import { db, imgdb } from "@/utils/configs/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { generateUUID } from "@/utils/uid";

type Collection = "Users" | "Properties";

type RequestProperties = {
  collection: Collection;
  documentName?: string;
  form?: unknown;
  field?: string;
  operator?: "<" | "<=" | "==" | "!=" | ">=" | ">";
  value?: string;
};

export class FirebaseClient {
  async getDataByCondition<T>(request: RequestProperties): Promise<T> {
    try {
      const reference = query(
        collection(db, request.collection),
        where(request.field, request.operator, request.value)
      );
      const queryResult = await getDocs(reference);
      return queryResult.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T;
    } catch (error) {
      console.error("getDataByCondition: ", error);
      throw error;
    }
  }

  async getDocumentByName<T>(request: RequestProperties): Promise<T> {
    try {
      const reference = doc(db, request.collection, request.documentName);
      const queryResult = await getDoc(reference);
      if (queryResult.exists()) {
        return { id: queryResult.id, ...queryResult.data() };
      } else {
        throw Error("Aucun document trouvé !");
      }
    } catch (error) {
      console.error("getDocumentByName: ", error);
      throw error;
    }
  }

  async getAllDocuments<T>(request: RequestProperties): Promise<T> {
    try {
      const reference = collection(db, request.collection);
      const queryResult = await getDocs(reference);
      return queryResult.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("getAllDocuments: ", error);
      throw error;
    }
  }

  async addDocument(request: RequestProperties):  Promise<string> {
    try {
      const reference = await addDoc(
        collection(db, request.collection),
        request.form
      );
      return reference.id;
    } catch (error) {
      console.error("addDocument: ", error);
      throw error;
    }
  }

  async updateDocument(request: RequestProperties): Promise<void> {
    try {
      const reference = doc(db, request.collection, request.documentName);
      await setDoc(reference, request.form, { merge: true });
    } catch (error) {
      console.error("updateDocument: ", error);
      throw error;
    }
  }

  async deleteDocument(request: RequestProperties): Promise<void> {
    try {
      const reference = doc(db, request.collection, request.documentName);
      await deleteDoc(reference);
    } catch (error) {
      console.error("deleteDocument: ", error);
      throw error;
    }
  }

  async saveImage(image: File) {
    try {
      const imageType = image.type.split("/").at(-1);
      const storageRef = ref(
        imgdb,
        `properties/${generateUUID()}.${imageType}`
      );

      const queryResult = await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(queryResult.ref);
      console.log(imageUrl);
      
      return imageUrl;
    } catch (error) {
      console.error("saveImage: ", error);
      throw error;
    }
  }
}

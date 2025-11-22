// Interfaces para Sub-documentos
export interface Imagen {
    id: string;
    descripcion: string;
    empresa: string,
    url: string;
}
 
export interface Ubicacion {
    direccion: string;
    telefono?: string; // Opcional
    barrio: string;
    partido: string;
    region: string;
    provincia: string;
    CP: string;
}

export interface CoberturaInterface {
    _id?: string;
    key: string;
    label: string;
    children?: {
        _id?: string;
        key: string;
        label: string;
        id?: string;
    }[]; 
}

export interface Attribute {
    id: string | null;
    name: string;
    value_id: string | null;
    value_name: string;
    attribute_group_id: string | null;
    attribute_group_name: string;
    value_type: string | null;
}
  
  export interface Content {
    text: string;
    descripcion: string;
  }

  export interface Item {
    label: string;
    icon?: string;
    items?: Item[][];
  }

  export interface FormData {
    grupo?: string;
    empresa_prepaga?: string;
    edad_1?: number;
    edad_2?: number;
    numkids?: number;
    tipo?: string;
    agree?: boolean;
    aporteOS?: boolean;
    sueldo?: boolean;
    aporte?: number;
    monoadic?: boolean;
    cantAport?: number;
    afinidad?: boolean;
    bonAfinidad?: number;
    supras?: boolean;
    segvida?: boolean;
    segvida1?: boolean;
    region?: string;
    personalData?: PersonalData; // Aquí tienes una referencia a la interfaz PersonalData
  }
  
  export interface PersonalData {
    name?: string;
    email?: string;
    phone?: string;
    region?: string;
    // Aquí puedes definir más propiedades si es necesario
  }
  
  export interface Quote {
    adultos:number;
    menores:number;
    region:string;

  }
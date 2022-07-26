export interface NodeElement {
  target: {
    dataset: {
      id: string
    }
  }
}

export interface TypeNode {
  id: string
  color: string
  $cinfo: CompilerInfo
}

export interface CompilerInfo {
  $fields: Fields[]
  $listeners: Listeners[]
}

export interface Listeners {
  $type: string
  $checkpoints: Checkpoints
}

export interface Checkpoints {
  $unique_id: string
  $name: string
  $params: object
  $conditions: {
    $equals?: any
    $includes?: any
    $startsWith?: any
    $endsWith?: any
  }
}

export interface Fields {
  $type: string
  $name: string
  $placeholder?: string
  $value?: string
}

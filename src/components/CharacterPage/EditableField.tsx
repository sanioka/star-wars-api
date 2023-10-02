import React, { FC } from 'react'
import { Editable, EditableInput, EditablePreview, HStack, Text, useColorModeValue } from '@chakra-ui/react'

const EditableField: FC<Props> = ({ isEditMode, fieldItem, fieldData, onChange, onDoubleClick }) => {
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700')
  const { header = '', id: fieldId, postfix } = fieldItem

  const content = isEditMode ? (
    <Editable
      defaultValue={fieldData || ''}
      startWithEditView={false}
      flex={1}
      // onSubmit={(nextValue) => {}}
      // onCancel={(previousValue) => console.log('onCancel:', previousValue)}
      onChange={(nextValue) => {
        // console.log('onChange:', nextValue)
        onChange(fieldId, nextValue)
      }}
    >
      <EditablePreview w={'100%'} bgColor={hoverBgColor} px={2} minH="1em" />
      <EditableInput w={'100%'} px={2} minH="1em" />
    </Editable>
  ) : (
    <Text size="sm" m={0} _hover={{ background: hoverBgColor }} px={2} cursor="pointer" onDoubleClick={onDoubleClick}>
      {fieldData || ''}
      {postfix}
    </Text>
  )

  return (
    <HStack align="center">
      {header && <Text>{header}</Text>}
      {content}
    </HStack>
  )
}

type Props = {
  isEditMode: boolean
  fieldData?: any
  setEditMode?: (state: boolean) => void
  onChange: (fieldId: string, nextValue: string) => void
  onDoubleClick: () => void
  fieldItem: FormField
}

export type FormField = {
  header: string
  id: string
  postfix?: string
}

export default EditableField

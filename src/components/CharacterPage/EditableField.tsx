import React, { FC, useCallback } from 'react'
import { Editable, EditableInput, EditablePreview, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { FormField } from './FormField'

const EditableField: FC<Props> = ({ isEditMode, fieldItem, value, onChange, onDoubleClick }) => {
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700')
  const { header = '', id: fieldId, postfix } = fieldItem

  const onChangeHandler = useCallback((nextValue: string) => onChange(fieldId, nextValue), [fieldId, onChange])

  const content = isEditMode ? (
    <Editable defaultValue={value || ''} startWithEditView={false} flex={1} onChange={onChangeHandler}>
      <EditablePreview w={'100%'} bgColor={hoverBgColor} px={2} minH="1em" />
      <EditableInput w={'100%'} px={2} minH="1em" />
    </Editable>
  ) : (
    <Text size="sm" m={0} _hover={{ background: hoverBgColor }} px={2} cursor="pointer" onDoubleClick={onDoubleClick}>
      {value || ''}
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
  fieldItem: FormField
  value?: string
  isEditMode: boolean
  onChange: (fieldId: string, nextValue: string) => void
  onDoubleClick: () => void
}

export default EditableField

import { Group, rem, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_UPLOAD_SIZE } from '@/lib/validation/articleValidationDefinitions';

export default function DropzoneImageUpload(props : Partial<DropzoneProps>) {
    return (
<Dropzone
  onDrop={(files) => console.log('accepted files', files)}
  onReject={(files) => console.log('rejected files', files)}
  maxSize={MAX_IMAGE_UPLOAD_SIZE * 1024 ** 2}
  accept={ACCEPTED_IMAGE_TYPES}
  {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            You can only have one image per article
          </Text>
        </div>
      </Group>
</Dropzone>
    );
}

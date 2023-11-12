type alertType = 'default' | 'info' | 'success' | 'warning' | 'error';

const iconNames = {
    'default': 'mdi:information-slab-circle-outline',
    'info': 'mdi:information-slab-circle-outline',
    'success': 'mdi:check-circle-outline',
    'warning': 'ion:warning-outline',
    'error': 'ion:close-circle-outline'
}

export const useToast = () => {

    const showToast = (type: alertType, text: string) => {
        
    }

    return { showToast }
}

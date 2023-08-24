onMount(async () => {
    const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            Authorization: `Bearer ${$accessToken}`,
            'Client-ID': 'k1voln47iaefm5u78y2ljjmn9vnmug'
        }
    });

    const responseData = await response.json();
    const userData = responseData.data.length > 0 ? responseData.data[0] : null;

    if (userData) {
        data = {
            displayName: userData.display_name,
            github: userData.id,
            website: userData.profile_image_url,
            bio: userData.description,
            email: userData.email
        };
    }
export const navItems = [
    {
        name: "Dashboard",
        icon: "/assets/icons/dashboard.svg",
        url: "/",
    },
    {
        name: "Documents",
        icon: "/assets/icons/documents.svg",
        url: "/documents",
    },
    {
        name: "Images",
        icon: "/assets/icons/images.svg",
        url: "/images",
    },
    {
        name: "Media",
        icon: "/assets/icons/video.svg",
        url: "/media",
    },
    {
        name: "Others",
        icon: "/assets/icons/others.svg",
        url: "/others",
    },
];

export const actionsDropdownItems = [
    {
        label: "Rename",
        icon: "/assets/icons/edit.svg",
        value: "rename",
    },
    {
        label: "Details",
        icon: "/assets/icons/info.svg",
        value: "details",
    },
    {
        label: "Share",
        icon: "/assets/icons/share.svg",
        value: "share",
    },
    {
        label: "Download",
        icon: "/assets/icons/download.svg",
        value: "download",
    },
    {
        label: "Delete",
        icon: "/assets/icons/delete.svg",
        value: "delete",
    },
];

export const sortTypes = [
    {
        label: "Date created (newest)",
        value: "$createdAt-desc",
    },
    {
        label: "Created Date (oldest)",
        value: "$createdAt-asc",
    },
    {
        label: "Name (A-Z)",
        value: "name-asc",
    },
    {
        label: "Name (Z-A)",
        value: "name-desc",
    },
    {
        label: "Size (Highest)",
        value: "size-desc",
    },
    {
        label: "Size (Lowest)",
        value: "size-asc",
    },
];

export const avatarPlaceholderUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACUCAMAAAAnDwKZAAAAOVBMVEWVu9////+QuN6Mtt35+/2kxOPt8/mcv+GHs9vz9/vp8Pi80+rg6vXU4vHA1evl7favy+bN3u/G2u2EKI/ZAAAEtElEQVR4nO1ca3OrIBTUAwgKRPD//9iLtW1MmgccdE3uZL90pplMtxzOe7VpPvjg/wMJIUxC+kFHc/kDItIqnKIbh64bRhdPQen0y6N5/YKMmnwn2wvIzk/KvAZJauw1vTNN2xxPUqjY3+a3oI9KHMzQPiT4RdIeyZFU94zgjE4dZm2yd+7gnzsZDuIoTnkEZxxjbLL5DBPHA86RQgnDtsXbmlQZw7bF+0yWL68xgClSLGXYthHLUWWGmzWkQjIUrpxh2zpk5NEchm2rcQyF51H0uGPUT2uH2+hhx1iWV9aA5Rhi2jlZGkWRa+dkaRBDrj/PAF1G/lWEXUZuyJkBCjtm4FMcDIYiIz//QGIoUg1FzF3UNRQhLl1eb68Bqb0/FD8UX4XiG3j0O8TFN8guhl0upoIRQ5HXoS4A9amCMYn4QcRQfIOStqkIjKiZyev3Lk3DLrsHFMOG30ejGNLEpTjBphGBmV+Ayw1dPEVe0OGmd2LkURxxwzsqWAqtcUJOu3kUgQSZxQ6ozFnACzuwkPMFVpqGLjWahlEzOixDjqXRy1QqdpgevaYUxcc44bfmhXlawgkWZxhoZvlGWS0BrCDOKFMeHKMxMQWx0SFz3wr5WyzcfvIK+aY+SkqU79XY+uESebMTsG7jCjlKk3gkwSyOx57hDPFYficPVC/+anlJPZifDL/jd7T2l0jHs4iA7klB+3OJSD5qIEsSysv1bpma041M405nre+8w5ZeYfTeRCKMy/VbiTGoUdOFvYdJrcTI34IPOQax91GS0CGe3cPp1d8jkz48TTFOp6DFWtFN+nzGMqYP92MpTPCXrtFdKaLpG5dfuxIFDz6YXdw8mfJWCIzPtOXU3Pya2l6TTuFO6dXZR7eLyN6pfN3GpQXpB7GvD3ceeEi/Dg/qtUFvSPJZ1yyn2Qcu/iDNnjU9acG2q4DM89m2HLxVYn7S5QtGKOuH5z2i36gYz1exydH56L0bsxvYbXRu3HlnHjbpXSsWQTnYoKsRFfKrHNRLtEp1+uWoj4/M5UA+xlqGux9iOsY6hnzZbD4qAw/tz7Btqyju7ywzqhyGu0krw1gTd/jy6BLUDKVqhBolqNglcB684aBmYFEhGipBxdIIcxWrLmOVUrEE7O0gJirOYEfGGqV+Gdi6fsNUaZSj4wZvg2LYtkyKtHNLsAazpcZ5C9tfaqSUpWBKL2sEqaXgClghldgCZgPDVYZxwNwFc57e5aJnpUCkQzNdGlXPLmBVtXytJwesUSOihT6D1UwTMOakqMOiCIw5KeqwKCIZ8h6EwVLkTU2wFDmHCOutFjDSCza5sNLLO1CE5j9WBtx33fIXjAUMNkWzkvQbGBo30FnAqWnLNcc1YOmVoVGH+bAOKdg59uxnkk1wAJa9CxUrAxLK7tzwO1urgZoVDzZDQsCCHOxGejcyjfWbtwmjt82Wb7lM/6qyG/Zb3qo95IIkDAU/9lVWl/3oA5kdZWMkhA42OhZN6aINGvFG2EXbFCbXy9xXRMreTeH3qyhQsnu6n5P3rrtne9l3zvsp3Tuzu27xEVFqtFIh2FP07ufVuc7HyYaglE5X42XeoJtsKM4vIH7JdxB/8EEl/gHRSz6VifV3nwAAAABJRU5ErkJggg==";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
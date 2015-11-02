#vagrant plugin install vagrant-winnfsd
Vagrant.configure("2") do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "opscode-ubuntu-14.04"
  config.vm.box_url = "http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_ubuntu-14.04_chef-provisionerless.box"
  config.vm.provision :shell, :path => "bootstrap.sh"

  config.vm.network :private_network, ip: "192.168.2.2"
  config.vm.network "forwarded_port", guest: 35729, host: 35729 #LiveReload

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder "../", "/vagrant", :mount_options => ["dmode=777","fmode=777"]
  #config.vm.synced_folder "../", "/vagrant",type: "nfs"
  #type: "nfs", mount_options: ['actimeo=1']
  
  # Set Host name
  config.vm.host_name = "vagrant"
end
